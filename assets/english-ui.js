/* ============================================================
 * AI 教师 · 英语课件通用交互组件（english-ui.js）
 * 依赖：player-core.js（提供 steps 渲染 / 控制栏 / 语音 / 星星连击）
 *
 * 英语课件页只需：
 *   1) <script src="../assets/english-ui.js"></script>
 *   2) 定义数据 window.COURSE（见下方字段说明），然后：
 *      EngUI.launch(window.COURSE);
 *
 * COURSE 字段：
 *   unit/title/grade/term（课件标题）
 *   scene {h2,text,question,hint}
 *   s1_task / s1_voice ...
 *   words_title / words_intro / s2_task / s2_voice / words:[{e,z,em}]
 *   pattern {title, sentence:[], zh, talk:[], desc}
 *   order {words:[], right:[], hint}
 *   s3_task / s3_voice
 *   quiz:[{q,opts,ok,hint}]（3 道）
 *   s4_task / s4_voice
 *   summary_points:[[k,v]...] + phonics {tip,words}
 *   s5_task / s5_voice
 *   boss {title, type:'mc'|'order', q, opts, ok, hint | words,right,hint}
 *   s6_task / s6_voice
 *   parent {summary, attention, tip}
 * ============================================================ */
window.EngUI = (function () {
  "use strict";

  function el(id) { return document.getElementById(id); }

  var animToken = 0;   // 步骤动画令牌：每次进入新步骤自增，作废旧步骤的定时动画/自动朗读

  /* HTML 转义（body 里的中文/英文文本用） */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ================= 单词卡 ================= */
  function renderWords(boxId, words) {
    var box = el(boxId);
    if (!box) { return; }
    var h = '<div class="words">';
    for (var i = 0; i < words.length; i++) {
      h += '<div class="wcard" id="wc-' + boxId + "-" + i + '" data-i="' + i + '">' +
        '<div class="emo">' + esc(words[i].em || "") + "</div>" +
        '<div class="en">' + esc(words[i].e) + "</div>" +
        '<div class="zh">' + esc(words[i].z) + "</div></div>";
    }
    h += "</div>";
    box.innerHTML = h;
  }

  /* 单词卡逐个弹出 + 朗读；点击卡片可重听 */
  function playWords(boxId, words, speakFn, interval, tok) {
    var box = el(boxId);
    if (!box) { return; }
    renderWords(boxId, words);
    box.addEventListener("click", function (ev) {
      var t = ev.target && ev.target.closest ? ev.target.closest(".wcard") : null;
      if (!t || !speakFn) { return; }
      var i = parseInt(t.getAttribute("data-i"), 10);
      if (words[i]) { speakFn(words[i]); }
    });
    var k = 0;
    function next() {
      if (tok !== animToken) { return; }   // 已切到其他步骤，停止自动朗读
      if (k >= words.length) { return; }
      var card = el("wc-" + boxId + "-" + k);
      if (card) {
        card.classList.remove("cur");
        card.classList.add("pop");
        card.classList.add("cur");
      }
      if (speakFn) { speakFn(words[k]); }
      k++;
      setTimeout(next, interval);
    }
    setTimeout(next, 400);
  }

  /* ================= 句型拼块动画 ================= */
  function renderSentence(boxId, tokens, zh) {
    var box = el(boxId);
    if (!box) { return; }
    var h = '<div class="sent">';
    for (var i = 0; i < tokens.length; i++) {
      h += '<span class="sword" id="sw-' + boxId + "-" + i + '">' + esc(tokens[i]) + "</span>";
    }
    h += "</div>";
    if (zh) { h += '<div class="sent-zh">' + esc(zh) + "</div>"; }
    box.innerHTML = h;
  }
  function playSentence(boxId, interval, tok) {
    var box = el(boxId);
    if (!box) { return; }
    var spans = box.querySelectorAll(".sword");
    var k = 0;
    function next() {
      if (tok !== animToken) { return; }   // 已切到其他步骤，停止动画
      if (k >= spans.length) { return; }
      spans[k].classList.add("on");
      k++;
      setTimeout(next, interval);
    }
    setTimeout(next, 350);
  }

  /* ================= 拼句游戏（点词块按序组句） ================= */
  function orderGame(boxId, msgId, opts) {
    var box = el(boxId);
    if (!box) { return; }
    var h = '<div class="order-box">';
    for (var i = 0; i < opts.words.length; i++) {
      h += '<span class="ob" id="ob-' + boxId + "-" + i + '" data-i="' + i + '">' + esc(opts.words[i]) + "</span>";
    }
    h += "</div>";
    box.innerHTML = h;

    var picked = [];
    function refresh() {
      for (var i = 0; i < opts.words.length; i++) {
        var s = el("ob-" + boxId + "-" + i);
        if (!s) { continue; }
        if (picked.indexOf(i) >= 0) { s.classList.add("picked"); }
      }
    }
    box.addEventListener("click", function (ev) {
      var t = ev.target && ev.target.closest ? ev.target.closest(".ob") : null;
      if (!t || t.classList.contains("picked")) { return; }
      var i = parseInt(t.getAttribute("data-i"), 10);
      var expect = opts.right[picked.length];
      if (i === expect) {
        picked.push(i);
        if (opts.api) { opts.api.comboHit(); }
        refresh();
        if (picked.length === opts.right.length) {
          var s = (opts.stars != null) ? opts.stars : 1;
          if (opts.api) { opts.api.addStars(s); }
          showMsg(msgId, opts.winMsg || ("句子拼对啦！⭐ +" + s), "ok");
          if (opts.onWin) { opts.onWin(); }
        }
      } else {
        if (opts.api) { opts.api.comboReset(); }
        showMsg(msgId, opts.hint || "顺序不对，再想想～", "no");
      }
    });
  }

  function showMsg(msgId, text, cls) {
    var m = el(msgId);
    if (!m) { return; }
    m.className = "qmsg " + (cls || "");
    m.textContent = text;
  }

  /* ================= 选择题测验（与数学一致的反馈） ================= */
  function runQuiz(boxId, quiz, api, doneMsg, star) {
    var box = el(boxId);
    if (!box) { return; }
    star = star || 1;
    var done = [];
    for (var i = 0; i < quiz.length; i++) { done.push(false); }

    function render() {
      var idx = -1;
      for (var j = 0; j < quiz.length; j++) { if (!done[j]) { idx = j; break; } }
      if (idx === -1) {
        box.innerHTML = '<div class="q">' + esc(doneMsg) + "</div>";
        return;
      }
      var q = quiz[idx];
      var h = '<div class="q">第 ' + (idx + 1) + " 题：" + esc(q.q) + "</div><div class='opts'>";
      for (var k = 0; k < q.opts.length; k++) {
        h += '<div class="opt" data-ok="' + (k === q.ok ? "1" : "0") + '">' + esc(q.opts[k]) + "</div>";
      }
      h += "</div><div class='qmsg'></div><button class='qnext' disabled>下一题</button>";
      box.innerHTML = h;

      var opts = box.querySelectorAll(".opt");
      var tried = false;
      for (var m = 0; m < opts.length; m++) {
        opts[m].addEventListener("click", function () {
          if (tried) { return; }
          var ok = this.getAttribute("data-ok") === "1";
          var msg = box.querySelector(".qmsg");
          if (ok) {
            this.classList.add("right");
            for (var x = 0; x < opts.length; x++) { opts[x].classList.add("locked"); }
            api.addStars(star); api.comboHit();
            msg.className = "qmsg ok";
            msg.textContent = "答对啦！⭐ +" + star + (api.state.combo >= 2 ? "（连击 +" + api.state.combo + "）" : "");
            box.querySelector(".qnext").disabled = false;
          } else {
            this.classList.add("wrong");
            tried = true;
            api.comboReset();
            msg.className = "qmsg no";
            msg.textContent = q.hint || "再试一次！";
            var self = this;
            setTimeout(function () { self.classList.remove("wrong"); tried = false; }, 1300);
          }
        });
      }
      box.querySelector(".qnext").addEventListener("click", function () {
        done[idx] = true;
        render();
      });
    }
    render();
  }

  /* ================= Boss 关 ================= */
  function runBoss(boxId, resultId, boss, api) {
    var box = el(boxId);
    if (!box) { return; }
    if (boss.type === "order") {
      var h = '<div class="q">' + esc(boss.q) + "</div>";
      box.innerHTML = h;
      orderGame(boxId + "-ob", boxId + "-msg", {
        words: boss.words,
        right: boss.right,
        hint: boss.hint,
        stars: 2,
        api: api,
        winMsg: "Boss 击败！⭐ +2 今天你是拼句小勇士！",
        onWin: function () { showResult(resultId, api); }
      });
      return;
    }
    var h2 = '<div class="q">' + esc(boss.q) + "</div><div class='opts'>";
    for (var i = 0; i < boss.opts.length; i++) {
      h2 += '<div class="opt" data-ok="' + (i === boss.ok ? "1" : "0") + '">' + esc(boss.opts[i]) + "</div>";
    }
    h2 += "</div><div class='qmsg'></div>";
    box.innerHTML = h2;
    var opts = box.querySelectorAll(".opt");
    var tried = false;
    for (var j = 0; j < opts.length; j++) {
      opts[j].addEventListener("click", function () {
        if (tried) { return; }
        var ok = this.getAttribute("data-ok") === "1";
        var msg = box.querySelector(".qmsg");
        if (ok) {
          this.classList.add("right");
          for (var x = 0; x < opts.length; x++) { opts[x].classList.add("locked"); }
          api.addStars(2); api.comboHit();
          msg.className = "qmsg ok";
          msg.textContent = "Boss 击败！⭐ +2 今天你是闯关小勇士！";
          showResult(resultId, api);
        } else {
          this.classList.add("wrong");
          tried = true;
          api.comboReset();
          msg.className = "qmsg no";
          msg.textContent = boss.hint || "再试一次！";
          var self = this;
          setTimeout(function () { self.classList.remove("wrong"); tried = false; }, 1400);
        }
      });
    }
  }

  function showResult(resultId, api) {
    var rs = el(resultId);
    if (!rs) { return; }
    var n = api.stars();
    rs.innerHTML = "🏆 共获得 <b>" + n + "</b> 颗星" +
      (n >= 9 ? "（全部拿下，太厉害啦！）" : n >= 5 ? "（很不错！）" : "（下次继续加油！）");
  }

  /* ================= 步骤构建 ================= */
  function buildSteps(C) {
    return [
      {
        id: "s1", title: "情境引入",
        task: C.s1_task, voice: C.s1_voice,
        body: function () {
          return "<h2>" + esc(C.scene.h2) + "</h2><p>" + esc(C.scene.text) + "</p>" +
            '<div class="big">' + esc(C.scene.question) + "</div>" +
            '<div class="hint">' + esc(C.scene.hint) + "</div>";
        }
      },
      {
        id: "s2", title: "单词大本营",
        task: C.s2_task, voice: C.s2_voice,
        body: function () {
          return "<h2>" + esc(C.words_title) + "</h2><p>" + esc(C.words_intro) + "</p>" +
            '<div class="demo"><div class="words" id="words-box"></div></div>';
        }
      },
      {
        id: "s3", title: "句型魔法",
        task: C.s3_task, voice: C.s3_voice,
        body: function () {
          return "<h2>" + esc(C.pattern.title) + "</h2>" +
            '<div id="sent-box"></div>' +
            '<div class="sent-zh talk">' + esc(C.pattern.desc) + "</div>" +
            '<div class="divider"></div>' +
            '<div class="order-title">✋ 轮到你了：' + esc(C.order.zh) + "</div>" +
            '<div id="order-box"></div><div id="order-msg"></div>';
        }
      },
      {
        id: "s4", title: "闯关练习",
        task: C.s4_task, voice: C.s4_voice,
        body: function () {
          return "<h2>闯关练习</h2><div class='quiz' id='quiz-box'></div>";
        }
      },
      {
        id: "s5", title: "要点小结",
        task: C.s5_task, voice: C.s5_voice,
        body: function () {
          var h = "<h2>要点小结</h2><div class='summary-box'>";
          for (var i = 0; i < C.summary_points.length; i++) {
            h += "<div class='sp'><b>" + esc(C.summary_points[i][0]) + "</b><span>" + esc(C.summary_points[i][1]) + "</span></div>";
          }
          h += "</div><div class='phonics-card'><div class='ph-t'>🔤 语音小贴士：" + esc(C.phonics.tip) + "</div><div class='ph-w'>" + esc(C.phonics.words) + "</div></div>";
          return h;
        }
      },
      {
        id: "s6", title: "Boss 关",
        task: C.s6_task, voice: C.s6_voice,
        body: function () {
          return "<h2>" + esc(C.boss.title) + "</h2><div class='quiz' id='boss-box'></div>" +
            '<div class="result-big" id="result-stars"></div>';
        }
      }
    ];
  }

  /* 进入步骤钩子：启动对应动画/练习 */
  function enter(C, stepId, api) {
    var tok = ++animToken;   // 进入新步骤：作废旧步骤的定时动画/自动朗读
    if (stepId === "s2") {
      playWords("words-box", C.words, function (w) {
        api.speak(w.e + "，" + w.z);
      }, 2200, tok);
    }
    if (stepId === "s3") {
      renderSentence("sent-box", C.pattern.sentence, C.pattern.zh);
      playSentence("sent-box", 600, tok);
      orderGame("order-box", "order-msg", {
        words: C.order.words,
        right: C.order.right,
        hint: C.order.hint,
        api: api,
        winMsg: "拼对啦！⭐ +1"
      });
    }
    if (stepId === "s4") {
      runQuiz("quiz-box", C.quiz, api, "三题全部完成！⭐ 你真棒");
    }
    if (stepId === "s6") {
      runBoss("boss-box", "result-stars", C.boss, api);
    }
  }

  function launch(C) {
    var steps = buildSteps(C);
    var apiRef = null;
    function onEnterStep(step, api) {
      apiRef = api;
      enter(C, step.id, api);
    }
    window.PlayerCore.init({
      steps: steps,
      parent: C.parent,
      onEnterStep: onEnterStep,
      settings: { autoStopSteps: [2, 3, 5], pauseMs: 2500 }
    });
  }

  return {
    launch: launch,
    buildSteps: buildSteps,
    enter: enter
  };
})();
