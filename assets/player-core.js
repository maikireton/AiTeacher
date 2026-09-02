/* ============================================================
 * AI 教师 · 通用五段式播放器内核（player-core.js）
 * 所有课件共用：步骤渲染 / 控制栏 / 自动播放 / 语音 / 星星连击 / 家长面板
 *
 * 课件页使用方法（HTML 骨架须包含以下 id）：
 *   task-line、stage、dots、btn-prev、btn-auto、btn-voice、btn-next、
 *   score-row、parent-summary、parent-attention、parent-tip
 * 课件只负责定义 steps 数据 + 动画/练习函数（onEnterStep 钩子），
 * 具体见「数学/math-4-002-亿以内数的写法.html」示例。
 *
 * PlayerCore.init({ steps, parent, onEnterStep, settings })
 *   steps: [{ id,title,task,voice, body:function(){return html} }]
 *   parent: { summary, attention, tip }（家长面板文案）
 *   onEnterStep: function(step, api) 进入步骤钩子（启动动画/练习）
 *   settings: { autoStopSteps:[..], pauseMs, voiceRate, voicePitch }
 * 返回 api：{ el, cur, addStars, comboHit, comboReset, speak, stopSpeak }
 * ============================================================ */
window.PlayerCore = (function () {
  "use strict";

  function init(cfg) {
    cfg = cfg || {};
    var steps = cfg.steps || [];
    var parent = cfg.parent || {};
    var onEnterStep = cfg.onEnterStep || null;
    var settings = cfg.settings || {};
    var PAUSE = settings.pauseMs != null ? settings.pauseMs : 2500;
    var RATE = settings.voiceRate || 0.92;
    var PITCH = settings.voicePitch || 1.05;
    var AUTO_STOP = settings.autoStopSteps || [];

    var state = { cur: 0, stars: 0, combo: 0, auto: false, voice: true };
    var voiceToken = 0, voicePlaying = false, autoTimer = null;

    /* ---------- 回顾系统接入（record.js，可选） ---------- */
    var kpId = (window.Record && window.Record.getKpId()) || "";
    var answerStats = { correct: 0, wrong: 0 };
    var finished = false, startTime = Date.now();

    function el(id) { return document.getElementById(id); }
    var stage = el("stage"), taskLine = el("task-line"), dots = el("dots"), scoreRow = el("score-row");
    var btnPrev = el("btn-prev"), btnNext = el("btn-next"), btnAuto = el("btn-auto"), btnVoice = el("btn-voice");

    /* ---------- 语音（统一走 voice.js，支持 onEnd 供自动播放等读完） ---------- */
    function speak(text, onEnd) {
      var done = false;
      function finish() {
        if (done) { return; }
        done = true;
        voicePlaying = false;
        if (typeof onEnd === "function") { onEnd(); }
      }
      voicePlaying = true;
      if (!state.voice) {
        if (typeof onEnd === "function") { setTimeout(finish, 1200); }
        else { finish(); }
        return;
      }
      if (!("speechSynthesis" in window)) {
        if (typeof onEnd === "function") { setTimeout(finish, 1200); }
        else { finish(); }
        return;
      }
      if (window.AiVoice) {
        if (window.AiVoice.speakMixed && /[A-Za-z]/.test(text)) {
          window.AiVoice.speakMixed(text, { rate: RATE, pitch: PITCH, onEnd: finish });
        } else {
          window.AiVoice.speak(text, { rate: RATE, pitch: PITCH, onEnd: finish });
        }
        return;
      }
      try {
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(text);
        u.lang = "zh-CN";
        u.rate = RATE;
        u.pitch = PITCH;
        u.onend = finish;
        u.onerror = finish;
        window.speechSynthesis.speak(u);
      } catch (e) {
        if (typeof onEnd === "function") { setTimeout(finish, 1000); }
        else { finish(); }
      }
    }
    function stopSpeak() { try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {} }

    /* ---------- 渲染 ---------- */
    function renderDots() {
      var h = "";
      steps.forEach(function (_, i) {
        h += '<span class="dot' + (i < state.cur ? " done" : "") + (i === state.cur ? " cur" : "") + '"></span>';
      });
      if (dots) { dots.innerHTML = h; }
    }
    function renderScore() {
      if (!scoreRow) { return; }
      var h = '<span class="star">⭐×' + state.stars + "</span>";
      if (state.combo >= 2) { h += '<span class="combo">🔥 连击 ×' + state.combo + "</span>"; }
      if (finished && kpId) { h += '<span class="rec-ok">✓ 今日学习已记录</span>'; }
      scoreRow.innerHTML = h;
    }

    /* 走到最后一步（要点小结/结算）即视为学完本课，写入学习记录（幂等） */
    function tryFinish() {
      if (!kpId || finished) { return; }
      if (!window.Record) { return; }
      finished = true;
      var timeUsed = Math.round((Date.now() - startTime) / 1000);
      window.Record.logFinish(kpId, {
        stars: state.stars,
        correct: answerStats.correct,
        wrong: answerStats.wrong,
        timeUsed: timeUsed
      });
      renderScore();
    }
    function render() {
      if (!steps.length || state.cur < 0 || state.cur >= steps.length) { return; }
      var s = steps[state.cur];
      if (taskLine) { taskLine.innerHTML = "🎯 <b>任务：</b>" + s.task; }
      if (stage) { stage.innerHTML = s.body(); }
      renderDots();
      renderScore();

      voiceToken++;
      var vtoken = voiceToken;
      speak(s.voice, function () { onStepVoiceEnd(vtoken); });

      if (onEnterStep) {
        try { onEnterStep(s, api); } catch (e) { console.error("[player-core] onEnterStep 出错:", e); }
      }

      if (btnPrev) { btnPrev.disabled = state.cur === 0; }
      if (btnNext) {
        btnNext.disabled = false;
        btnNext.textContent = state.cur === steps.length - 1 ? "完成 🎉" : "下一步";
      }

      /* 走到最后一步：记录本次学习 */
      if (state.cur === steps.length - 1) { tryFinish(); }

      /* 选择题选项随机化：进入步骤后兜底扫描（覆盖静态 HTML 与同步 innerHTML 生成的选项） */
      scanOptions(document);
    }

    /* ---------- 自动播放：等音频读完再走 ---------- */
    function clearAutoTimer() { if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; } }
    function stopAuto() { clearAutoTimer(); state.auto = false; if (btnAuto) { btnAuto.classList.remove("on"); } }
    function autoAdvance() {
      autoTimer = null;
      if (!state.auto) { return; }
      if (state.cur < steps.length - 1) { state.cur++; render(); }
      else { stopAuto(); }
    }
    function onStepVoiceEnd(vtoken) {
      if (vtoken !== voiceToken) { return; }
      if (!state.auto) { return; }
      if (AUTO_STOP.indexOf(state.cur) !== -1) { stopAuto(); return; }
      if (state.cur >= steps.length - 1) { stopAuto(); return; }
      clearAutoTimer();
      autoTimer = setTimeout(autoAdvance, PAUSE);
    }
    function startAuto() {
      state.auto = true;
      if (btnAuto) { btnAuto.classList.add("on"); }
      if (AUTO_STOP.indexOf(state.cur) !== -1) { stopAuto(); return; }
      if (state.cur >= steps.length - 1) { stopAuto(); return; }
      if (voicePlaying) { return; }
      clearAutoTimer();
      autoTimer = setTimeout(autoAdvance, PAUSE);
    }

    /* ---------- 控制栏 ---------- */
    if (btnPrev) {
      btnPrev.addEventListener("click", function () {
        stopSpeak(); clearAutoTimer();
        if (state.cur > 0) { state.cur--; }
        render();
      });
    }
    if (btnNext) {
      btnNext.addEventListener("click", function () {
        stopSpeak(); clearAutoTimer();
        if (state.cur < steps.length - 1) { state.cur++; render(); }
        else { render(); }
      });
    }
    if (btnVoice) {
      btnVoice.addEventListener("click", function () {
        state.voice = !state.voice;
        btnVoice.classList.toggle("on", state.voice);
        if (!state.voice) { stopSpeak(); }
      });
    }
    if (btnAuto) {
      btnAuto.addEventListener("click", function () {
        state.auto = !state.auto;
        btnAuto.classList.toggle("on", state.auto);
        if (state.auto) { startAuto(); }
        else { stopSpeak(); clearAutoTimer(); }
      });
    }

    /* ---------- 家长面板 ---------- */
    var ps = el("parent-summary"), pa = el("parent-attention"), pt = el("parent-tip");
    if (ps && parent.summary) { ps.textContent = parent.summary; }
    if (pa && parent.attention) { pa.textContent = parent.attention; }
    if (pt && parent.tip) { pt.textContent = parent.tip; }

    /* ---------- 公开 API（供 onEnterStep 的动画/练习使用） ---------- */
    var api = {
      el: el,
      cur: function () { return state.cur; },
      stars: function () { return state.stars; },
      addStars: function (n) { state.stars += n; renderScore(); },
      comboHit: function () { state.combo++; answerStats.correct++; renderScore(); },
      comboReset: function () { state.combo = 0; answerStats.wrong++; renderScore(); },
      speak: speak,
      stopSpeak: stopSpeak,
      /* 课件可在合适时机显式调用完成记录（通常无需，走到最后一步自动记录） */
      finish: tryFinish,
      kpId: function () { return kpId; },
      state: state
    };

    render();
    if (btnPrev) { btnPrev.disabled = true; }
    return api;
  }

  /* ============================================================
   * 选择题选项随机化
   * 所有课件的选择题最终都以 <div class="opt" data-ok="0|1"> 渲染进 DOM
   * （旧课件内嵌 startQuiz/startBoss 与英语课件 english-ui 均为此结构）。
   * 每次进入步骤时（render 末尾）扫描并打乱同一题容器内选项顺序——
   * 正确答案位置每次随机，避免孩子靠“答案总在第一个”蒙对。
   * 答对/答错仍按元素 data-ok 判定，不受影响。
   * 用 data-shuffled 标记同一容器只洗一次；步骤重进时容器重建会重新随机。
   * ============================================================ */
  function shuffleContainer(container) {
    var opts = Array.prototype.slice.call(container.querySelectorAll(".opt[data-ok]"));
    if (opts.length < 2) { return; }
    for (var i = opts.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = opts[i]; opts[i] = opts[j]; opts[j] = t;
    }
    for (var k = 0; k < opts.length; k++) { container.appendChild(opts[k]); }
  }

  function scanOptions(root) {
    if (!root || !root.querySelectorAll) { return; }
    var found = root.querySelectorAll(".opt[data-ok]");
    var seen = {};
    for (var i = 0; i < found.length; i++) {
      var c = found[i].parentNode;
      if (!c || seen[c]) { continue; }
      seen[c] = true;
      if (c.getAttribute && c.getAttribute("data-shuffled") === "1") { continue; }
      if (c.setAttribute) { c.setAttribute("data-shuffled", "1"); }
      shuffleContainer(c);
    }
  }

  /* 兜底：异步插入的选项（如 setTimeout 后 innerHTML）也能被捕获 */
  if (typeof MutationObserver !== "undefined") {
    var mo = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var nodes = muts[i].addedNodes;
        for (var j = 0; j < nodes.length; j++) {
          var n = nodes[j];
          if (n && n.nodeType === 1 && n.querySelector && n.querySelector(".opt[data-ok]")) {
            scanOptions(n);
          }
        }
      }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }

  return { init: init };
})();
