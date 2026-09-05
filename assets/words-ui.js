/* ============================================================
 * AI 教师 · 单词闯关模块逻辑（words-ui.js）
 * 依赖：voice.js（发音）+ wordbank.js（词库）
 * 功能：学习(听说读写用) / 练习 / 测试 / 定向复习 / 统计 / 打卡成长
 * 数据：localStorage 记录掌握度、星星、打卡、徽章
 * ============================================================ */
(function () {
  "use strict";
  var WB = window.WORDBANK;
  var AiVoice = window.AiVoice;
  var STORE_KEY = "aiTeacher:words:state";

  /* ---------------- 状态 ---------------- */
  function defaultState() {
    return { rec: {}, stars: 0, days: {}, badges: {}, curGroup: null };
  }
  var state = loadState();
  function loadState() {
    try {
      var s = JSON.parse(localStorage.getItem(STORE_KEY));
      if (s && s.rec) { return s; }
    } catch (e) {}
    return defaultState();
  }
  function saveState() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  /* 词索引：给每个词一个稳定 id = 主题id-序号 */
  var byId = {};
  var groupMeta = [];
  WB.groups.forEach(function (g, gi) {
    var meta = { id: g.id, name: g.name, grade: g.grade, em: g.em, count: g.words.length, gi: gi, learned: 0, sumLv: 0 };
    g.words.forEach(function (w, wi) {
      var id = g.id + "-" + wi;
      byId[id] = { id: id, gid: g.id, w: w };
      if (recOf(id).lv >= 1) { meta.learned++; }
      meta.sumLv += recOf(id).lv;
    });
    groupMeta.push(meta);
  });

  function recOf(id) {
    if (!state.rec[id]) { state.rec[id] = { lv: 0, right: 0, wrong: 0, last: 0, due: 0 }; }
    return state.rec[id];
  }
  function wordsOf(gid) {
    var g = WB.groups.filter(function (x) { return x.id === gid; })[0];
    if (!g) { return []; }
    return g.words.map(function (w, wi) { return byId[gid + "-" + wi]; });
  }
  function lvName(lv) { return ["待学", "初识", "认识", "熟悉", "熟练", "精通"][lv] || "待学"; }
  /* 不熟练：只针对"测试/练习答错过"的词（wrong>=1）且掌握度不高；刚学(lv=1)不自动进错词本 */
  function isWeak(rec) { return rec.wrong >= 1 && rec.lv <= 2; }

  /* ---------------- 语音 ---------------- */
  function say(text) { if (AiVoice) { if (AiVoice.hasLatin(text)) { AiVoice.speakMixed(text); } else { AiVoice.speak(text); } } }
  function sayWord(w) { say(w.w); }
  function sayZh(w) { say(w.zh); }
  function sayEx(w) { if (w.ex) { say(w.ex[0]); } }

  /* ---------------- 游戏化 ---------------- */
  function todayStr() {
    var d = new Date(), m = (d.getMonth() + 1 < 10 ? "0" : "") + (d.getMonth() + 1),
      day = (d.getDate() < 10 ? "0" : "") + d.getDate();
    return d.getFullYear() + "-" + m + "-" + day;
  }
  function addStars(n) { state.stars += n; saveState(); }
  function checkin() {
    var t = todayStr();
    if (state.days[t]) { return false; }
    state.days[t] = true;
    addStars(10);
    return true;
  }
  function streakDays() {
    var d = new Date(), n = 0;
    for (var i = 0; i < 400; i++) {
      var m = (d.getMonth() + 1 < 10 ? "0" : "") + (d.getMonth() + 1),
        day = (d.getDate() < 10 ? "0" : "") + d.getDate();
      if (state.days[d.getFullYear() + "-" + m + "-" + day]) { n++; d.setDate(d.getDate() - 1); }
      else { break; }
    }
    return n;
  }
  function levelName() {
    var s = state.stars;
    if (s >= 600) { return "🏆 词汇大师"; }
    if (s >= 300) { return "🌟 单词达人"; }
    if (s >= 150) { return "⭐ 记忆新星"; }
    if (s >= 50) { return "🎒 单词学徒"; }
    return "👶 萌新学者";
  }
  function badges() {
    var b = [];
    if (streakDays() >= 7) { b.push(["💪 毅力之星", "连续打卡 7 天"]); }
    else if (streakDays() >= 3) { b.push(["🌱 坚持之星", "连续打卡 3 天"]); }
    groupMeta.forEach(function (g) {
      var done = wordsOf(g.id).filter(function (it) { return recOf(it.id).lv >= 3; }).length;
      if (done >= g.count) { b.push([g.em + " " + g.name + " 满分", "学完主题" + g.name]); }
    });
    if (state.badges["full"] && state.badges["full"].n) { b.push(["🎯 满分学霸", "测试满分 " + state.badges["full"].n + " 次"]); }
    return b;
  }

  /* ---------------- DOM 帮助 ---------------- */
  var body = document.getElementById("ws-body");
  function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
  function starRow(n) { var s = ""; for (var i = 0; i < 5; i++) { s += i < n ? "⭐" : "☆"; } return s; }

  /* ---------------- 顶部状态条 ---------------- */
  function renderTop() {
    document.getElementById("ws-lv").textContent = levelName();
    document.getElementById("ws-stars").textContent = "⭐ " + state.stars;
    var cb = document.getElementById("ws-checkin");
    cb.textContent = state.days[todayStr()] ? "✅ 已打卡" : "📅 打卡";
    cb.style.opacity = state.days[todayStr()] ? ".6" : "1";
  }

  /* ---------------- 题型引擎 ---------------- */
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pickDistractors(target, pool, n) {
    var others = pool.filter(function (it) { return it.id !== target.id; });
    return shuffle(others.slice()).slice(0, n);
  }
  function makeQuestion(kind, target, pool) {
    if (kind === "listen") {
      var opts = [target].concat(pickDistractors(target, pool, 3));
      return { kind: "listen", target: target, prompt: "听一听，选出你听到的单词", opts: shuffle(opts), play: function () { sayWord(target.w); } };
    }
    if (kind === "zh2en") {
      var opts2 = [target].concat(pickDistractors(target, pool, 3));
      return { kind: "zh2en", target: target, prompt: "选出意思为「" + target.w.zh + "」的单词", opts: shuffle(opts2) };
    }
    if (kind === "en2zh") {
      var opts3 = [target].concat(pickDistractors(target, pool, 3));
      return { kind: "en2zh", target: target, prompt: "「" + target.w.w + "」是什么意思？", opts: shuffle(opts3) };
    }
    if (kind === "sentence") {
      var opts4 = [target].concat(pickDistractors(target, pool, 3));
      return { kind: "sentence", target: target, prompt: "选词填空：" + target.w.ex[0].replace(new RegExp(target.w.w, "i"), "____"), opts: shuffle(opts4) };
    }
    // spell：短语(含空格/连字符)不适合26字母键盘，退化为中译英
    if (target.w.w.indexOf(" ") >= 0 || target.w.w.indexOf("-") >= 0) {
      var opts5 = [target].concat(pickDistractors(target, pool, 3));
      return { kind: "zh2en", target: target, prompt: "选出意思为「" + target.w.zh + "」的单词", opts: shuffle(opts5) };
    }
    return { kind: "spell", target: target, prompt: "听一听 / 想一想，拼出「" + target.w.zh + "」的单词" };
  }

  /* 答题会话 */
  var quiz = null;
  function startQuiz(kindSet, pool, mode, opts) {
    opts = opts || {};
    var list = opts.words ? opts.words.slice() : shuffle(pool.slice()).slice(0, opts.count || 8);
    list = list.map(function (it) {
      var k = kindSet[Math.floor(Math.random() * kindSet.length)];
      return makeQuestion(k, it, pool);
    });
    quiz = { list: list, i: 0, right: 0, wrong: 0, wrongWords: [], mode: mode, group: opts.group, locked: false };
    renderQuestion();
  }
  function updateRecAfter(id, ok) {
    var r = recOf(id);
    if (ok) { r.right++; r.lv = Math.min(5, r.lv + 1); }
    else { r.wrong++; r.lv = Math.max(1, r.lv - 1); }
    r.last = Date.now();
    r.due = 0;
    saveState();
  }
  function renderQuestion() {
    if (!quiz || quiz.i >= quiz.list.length) { renderQuizResult(); return; }
    var q = quiz.list[quiz.i];
    quiz.locked = false;
    var h = '<div class="ws-qhead">第 ' + (quiz.i + 1) + " / " + quiz.list.length + " 题 · " + modeName(quiz.mode) + "</div>";
    h += '<div class="ws-qprompt">' + q.prompt + "</div>";
    if (q.play) {
      h += '<button class="ws-play" data-act="q-play">🔊 再听一遍</button>';
    }
    if (q.kind === "spell") {
      h += spellHTML(q.target.w);
    } else {
      h += '<div class="ws-opts">';
      q.opts.forEach(function (o, i) {
        var label = (q.kind === "zh2en" || q.kind === "sentence") ? o.w.w : (q.kind === "en2zh" ? o.w.zh : o.w.w);
        var extra = (q.kind === "en2zh") ? '<small> ' + (o.w.p || "") + "</small>" : "";
        h += '<button class="ws-opt" data-act="answer" data-i="' + i + '">' + label + extra + "</button>";
      });
      h += "</div>";
    }
    h += '<div class="ws-fb" id="ws-fb"></div>';
    body.innerHTML = h;
    if (q.play) { setTimeout(function () { q.play(); }, 200); }
  }
  function modeName(m) { return m === "test" ? "小测试" : (m === "review" ? "定向复习" : "闯关练习"); }

  /* 拼写虚拟键盘 */
  function spellHTML(w) {
    var h = '<div class="ws-spell">';
    h += '<div class="ws-spell-word" id="spell-word">' + w.w.split("").map(function () { return "_"; }).join(" ") + "</div>";
    h += '<div class="ws-spell-keys">';
    "abcdefghijklmnopqrstuvwxyz".split("").forEach(function (c) {
      h += '<button class="ws-key" data-act="s-key" data-k="' + c + '">' + c + "</button>";
    });
    h += '<button class="ws-key ws-key-lg" data-act="s-back">⌫</button>';
    h += '<button class="ws-key ws-key-lg" data-act="s-clear">清空</button>';
    h += '<button class="ws-key ws-key-ok" data-act="s-ok">✔ 确定</button>';
    h += "</div></div>";
    return h;
  }

  /* ---------------- 答题反馈 ---------------- */
  function answer(i) {
    if (!quiz || quiz.locked || quiz.i >= quiz.list.length) { return; }
    var q = quiz.list[quiz.i];
    quiz.locked = true;
    var ok = (q.opts[i].id === q.target.id);
    updateRecAfter(q.target.id, ok);
    if (ok) { quiz.right++; } else { quiz.wrong++; quiz.wrongWords.push(q.target); }
    var fb = document.getElementById("ws-fb");
    if (ok) {
      addStars(1);
      fb.innerHTML = '<div class="ws-fb-ok">✅ 答对啦！<b>+' + (1) + "星</b> " + starRow(recOf(q.target.id).lv) + "</div>";
      fb.innerHTML += '<button class="ws-btn" data-act="q-next">下一题 →</button>';
    } else {
      var rightWord = q.kind === "en2zh" ? q.target.w.zh : q.target.w.w;
      fb.innerHTML = '<div class="ws-fb-no">❌ 正确答案是 <b>' + rightWord + "</b></div>";
      fb.innerHTML += '<button class="ws-btn" data-act="q-next">下一题 →</button>';
    }
    var opts = body.querySelectorAll(".ws-opt");
    opts.forEach(function (o, j) {
      if (q.opts[j].id === q.target.id) { o.classList.add("right"); }
      if (j === i && !ok) { o.classList.add("wrong"); }
      o.classList.add("locked");
    });
  }

  /* ---------------- 学习流程 ---------------- */
  var learn = { gid: null, idx: 0, list: [] };
  function renderGroups() {
    var h = '<div class="ws-sec-title">选择教材单元，开始闯关</div>';
    // 按册分组
    var books = {};
    var bookOrder = [];
    groupMeta.forEach(function (g) {
      if (!books[g.grade]) { books[g.grade] = []; bookOrder.push(g.grade); }
      books[g.grade].push(g);
    });
    bookOrder.forEach(function (bk) {
      var gs = books[bk];
      var total = gs.reduce(function (s, g) { return s + g.count; }, 0);
      var learned = gs.reduce(function (s, g) {
        return s + wordsOf(g.id).filter(function (it) { return recOf(it.id).lv >= 1; }).length;
      }, 0);
      var pct = total ? Math.round(learned / total * 100) : 0;
      h += '<div class="ws-book">';
      h += '<div class="ws-book-head"><span class="ws-book-name">' + bk + '</span>';
      h += '<span class="ws-book-meta">' + gs.length + '单元 · ' + total + '词 · 已学' + learned + '</span>';
      h += '<div class="ws-prog sm"><div class="ws-prog-bar" style="width:' + pct + '%"></div></div></div>';
      h += '<div class="ws-groups tight">';
      gs.forEach(function (g) {
        var recs = wordsOf(g.id).map(function (it) { return recOf(it.id); });
        var lrn = recs.filter(function (r) { return r.lv >= 1; }).length;
        var gpct = Math.round(lrn / g.count * 100);
        h += '<button class="ws-group" data-act="pick" data-gid="' + g.id + '">';
        h += '<div class="ws-group-em">' + g.em + "</div>";
        h += '<div class="ws-group-name">' + g.name.replace(/^[三四五六]上?下?\s*U\d+\s*/, "") + "</div>";
        h += '<div class="ws-group-sub">' + g.count + "词 · " + lrn + "已学</div>";
        h += '<div class="ws-prog"><div class="ws-prog-bar" style="width:' + gpct + '%"></div></div>';
        h += "</button>";
      });
      h += "</div></div>";
    });
    body.innerHTML = h;
  }
  function openGroup(gid) {
    resetRecorder();
    learn.gid = gid; learn.idx = 0; learn.list = wordsOf(gid);
    state.curGroup = gid; saveState();
    renderCard();
  }

  /* ---------------- 跟读录音 ---------------- */
  var recState = "idle"; // idle | requesting | recording | recorded
  var mediaRecorder = null;
  var audioStream = null;
  var audioChunks = [];
  var audioUrl = null;
  var recTimer = null;
  var recSeconds = 0;

  function resetRecorder() {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      try { mediaRecorder.stop(); } catch (e) {}
    }
    if (audioStream) {
      audioStream.getTracks().forEach(function (t) { t.stop(); });
      audioStream = null;
    }
    if (recTimer) { clearInterval(recTimer); recTimer = null; }
    if (audioUrl) { URL.revokeObjectURL(audioUrl); audioUrl = null; }
    audioChunks = [];
    recSeconds = 0;
    recState = "idle";
  }

  function startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast("当前浏览器不支持录音");
      return;
    }
    recState = "requesting";
    renderCard();
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      audioStream = stream;
      audioChunks = [];
      var mime = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "";
      mediaRecorder = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
      mediaRecorder.ondataavailable = function (e) { if (e.data.size > 0) { audioChunks.push(e.data); } };
      mediaRecorder.onstop = function () {
        var blob = new Blob(audioChunks, { type: mime || "audio/webm" });
        audioUrl = URL.createObjectURL(blob);
        recState = "recorded";
        if (recTimer) { clearInterval(recTimer); recTimer = null; }
        renderCard();
        toast("录音完成，点「听我的录音」回放");
      };
      mediaRecorder.start();
      recState = "recording";
      recSeconds = 0;
      recTimer = setInterval(function () {
        recSeconds++;
        var el = document.getElementById("rec-timer");
        if (el) { el.textContent = fmtTime(recSeconds); }
      }, 1000);
      renderCard();
    }).catch(function (err) {
      recState = "idle";
      renderCard();
      toast("无法访问麦克风：" + (err.message || err.name));
    });
  }

  function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    }
  }

  function playRecording() {
    if (!audioUrl) { return; }
    var a = new Audio(audioUrl);
    a.play().catch(function () { toast("播放失败"); });
  }

  function fmtTime(s) {
    var m = Math.floor(s / 60);
    var sec = s % 60;
    return m + ":" + (sec < 10 ? "0" : "") + sec;
  }

  function renderCard() {
    var it = learn.list[learn.idx];
    if (!it) { return; }
    var w = it.w;
    var rec = recOf(it.id);
    if (rec.lv === 0) { rec.lv = 1; rec.last = Date.now(); saveState(); }  // 看过即开始学习
    var g = WB.groups.filter(function (x) { return x.id === learn.gid; })[0];
    var h = '<div class="ws-sec-title">' + g.em + " " + g.name + " · 第 " + (learn.idx + 1) + "/" + learn.list.length + " 词</div>";
    h += '<div class="ws-card">';
    h += '<div class="ws-card-em">' + w.em + "</div>";
    h += '<div class="ws-card-word">' + w.w + "</div>";
    h += '<div class="ws-card-ph">' + (w.p ? w.p + " · " : "") + w.pos + " · " + w.zh + "</div>";
    h += '<div class="ws-card-sy">' + (w.sy ? w.sy.join(" · ") : "") + "</div>";
    h += '<div class="ws-card-lv">' + starRow(rec.lv) + " <small>" + lvName(rec.lv) + "</small></div>";
    h += "</div>";
    h += '<div class="ws-uses">';
    // 听 / 说 / 跟读录音
    h += '<div class="ws-use"><span>👂 听 / 🗣 说 / 🎤 跟读</span>';
    h += '<div class="ws-speak-row">';
    h += '<button class="ws-btn sm" data-act="c-speak">🔊 读单词</button>';
    if (recState === "idle") {
      h += '<button class="ws-btn sm rec-btn" data-act="c-rec-start">🎤 跟读录音</button>';
    } else if (recState === "requesting") {
      h += '<button class="ws-btn sm rec-btn" disabled>⏳ 正在请求麦克风...</button>';
    } else if (recState === "recording") {
      h += '<button class="ws-btn sm rec-btn recording" data-act="c-rec-stop">🔴 录音中 <span id="rec-timer">0:00</span> · 点我停止</button>';
    } else {
      h += '<button class="ws-btn sm" data-act="c-rec-play">▶️ 听我的录音</button>';
      h += '<button class="ws-btn sm rec-btn" data-act="c-rec-redo">🔄 重录</button>';
    }
    h += "</div></div>";
    if (w.ex) {
      h += '<div class="ws-use"><span>💡 例句</span><div class="ws-ex">' + w.ex[0] + '<br><small>' + w.ex[1] + "</small></div>";
      h += '<button class="ws-btn sm" data-act="c-ex">🔊 读例句</button></div>';
    }
    if (w.co && w.co.length) {
      h += '<div class="ws-use"><span>🔗 搭配</span><div class="ws-co">' +
        w.co.map(function (c) { return c[0] + " <small>" + c[1] + "</small>"; }).join("　") + "</div></div>";
    }
    h += "</div>";
    h += '<div class="ws-nav">';
    h += '<button class="ws-btn" data-act="c-prev"' + (learn.idx === 0 ? " disabled" : "") + ">◀ 上一个</button>";
    if (learn.idx < learn.list.length - 1) {
      h += '<button class="ws-btn main" data-act="c-next">下一个 ▶</button>';
    } else {
      h += '<button class="ws-btn main" data-act="c-done">学完了，去练习 🎯</button>';
    }
    h += "</div>";
    body.innerHTML = h;
    sayWord(w);
  }

  /* ---------------- 统计 ---------------- */
  function renderStats() {
    var total = 0, learned = 0, weak = [];
    Object.keys(byId).forEach(function (id) {
      var r = recOf(id); total++;
      if (r.lv >= 1) { learned++; }
      if (isWeak(r)) { weak.push({ id: id, r: r }); }
    });
    var dist = [0, 0, 0, 0, 0, 0];
    Object.keys(byId).forEach(function (id) { dist[recOf(id).lv]++; });
    var h = '<div class="ws-sec-title">学习统计</div>';
    h += '<div class="ws-stat-cards">';
    h += statCard("📚 已学单词", learned + " / " + total);
    h += statCard("⭐ 总星星", String(state.stars));
    h += statCard("🔥 连续打卡", streakDays() + " 天");
    h += "</div>";
    h += '<div class="ws-sec-title">掌握度分布</div><div class="ws-dist">';
    for (var lv = 5; lv >= 1; lv--) {
      h += '<div class="ws-dist-row"><span class="ws-dist-lv">' + starRow(lv) + "</span>";
      h += '<div class="ws-prog"><div class="ws-prog-bar" style="width:' + Math.round(dist[lv] / total * 100) + '%"></div></div>';
      h += "<span class='ws-dist-n'>" + dist[lv] + "</span></div>";
    }
    h += "</div>";
    h += '<div class="ws-sec-title">错词本 · 不熟练单词（' + weak.length + "）</div>";
    if (weak.length) {
      h += '<button class="ws-btn main" data-act="review-start">🎯 定向复习这些词</button>';
      h += '<div class="ws-weak">';
      weak.forEach(function (it) {
        var w = byId[it.id].w;
        h += '<button class="ws-weak-item" data-act="w-say" data-gid="' + it.id + '">';
        h += "<b>" + w.w + "</b> " + w.zh + " <small>" + starRow(it.r.lv) + " 错" + it.r.wrong + "次</small>";
        h += "</button>";
      });
      h += "</div>";
    } else {
      h += '<div class="ws-empty">太棒了！没有不熟练的单词 🎉</div>';
    }
    h += '<div class="ws-sec-title">打卡日历（近 14 天）</div><div class="ws-cal">';
    var d = new Date();
    for (var i = 13; i >= 0; i--) {
      var dd = new Date(d); dd.setDate(d.getDate() - i);
      var m = (dd.getMonth() + 1 < 10 ? "0" : "") + (dd.getMonth() + 1),
        day = (dd.getDate() < 10 ? "0" : "") + dd.getDate();
      var key = dd.getFullYear() + "-" + m + "-" + day;
      h += '<div class="ws-cal-d' + (state.days[key] ? " on" : "") + '">' + (i === 0 ? "今" : (day === todayStr().slice(8) && m === todayStr().slice(5, 7) ? "今" : String(dd.getDate()))) + "</div>";
    }
    h += "</div>";
    h += '<div class="ws-sec-title">我的徽章</div><div class="ws-badges">';
    var b = badges();
    if (b.length) { b.forEach(function (x) { h += '<div class="ws-badge"><span>' + x[0] + "</span><small>" + x[1] + "</small></div>"; }); }
    else { h += '<div class="ws-empty">坚持学习、连续打卡，就能点亮徽章！</div>'; }
    h += "</div>";
    body.innerHTML = h;
  }
  function statCard(label, val) {
    return '<div class="ws-stat"><div class="ws-stat-label">' + label + '</div><div class="ws-stat-val">' + val + "</div></div>";
  }

  /* ---------------- 测试设置 ---------------- */
  function renderTestSetup() {
    var h = '<div class="ws-sec-title">选择要测试的主题</div><div class="ws-groups">';
    groupMeta.forEach(function (g) {
      var learned = wordsOf(g.id).filter(function (it) { return recOf(it.id).lv >= 2; }).length;
      h += '<button class="ws-group" data-act="test-pick" data-gid="' + g.id + '">';
      h += '<div class="ws-group-em">' + g.em + '</div><div class="ws-group-name">' + g.name + "</div>";
      h += '<div class="ws-group-sub">' + g.count + "词 · 已学 " + learned + "</div></button>";
    });
    h += "</div>";
    body.innerHTML = h;
  }
  var testCfg = { gid: null, count: 8 };
  function renderTestCfg() {
    var g = WB.groups.filter(function (x) { return x.id === testCfg.gid; })[0];
    var h = '<div class="ws-sec-title">' + g.em + " " + g.name + " 小测试</div>";
    h += '<div class="ws-cfg"><span>题数：</span>';
    [5, 8, 10].forEach(function (n) {
      h += '<button class="ws-btn sm' + (testCfg.count === n ? " on" : "") + '" data-act="test-num" data-n="' + n + '">' + n + "题</button>";
    });
    h += "</div>";
    h += '<button class="ws-btn main" data-act="test-start">🚀 开始测试</button>';
    h += '<button class="ws-btn" data-act="test-pick" data-gid="">← 换主题</button>';
    body.innerHTML = h;
  }

  /* ---------------- 结果页 ---------------- */
  function renderQuizResult() {
    var q = quiz;
    var total = q.list.length;
    var pct = Math.round(q.right / total * 100);
    var h = '<div class="ws-sec-title">' + (q.mode === "test" ? "测试完成！" : q.mode === "review" ? "复习完成！" : "练习完成！") + "</div>";
    h += '<div class="ws-result">' + pct + '<small>分</small></div>';
    h += '<div class="ws-result-sub">答对 <b>' + q.right + "</b> / " + total + " 题";
    if (q.right === total) { h += " · 🎉 全对！"; if (q.mode === "test") { state.badges["full"] = { n: (state.badges["full"] && state.badges["full"].n || 0) + 1 }; saveState(); } }
    h += "</div>";
    if (q.wrongWords.length) {
      h += '<div class="ws-sec-title2">本轮错词（已记入掌握度，建议复习）</div><div class="ws-weak">';
      q.wrongWords.forEach(function (it) {
        h += '<button class="ws-weak-item" data-act="w-say" data-gid="' + it.id + '"><b>' + it.w.w + "</b> " + it.w.zh + "</button>";
      });
      h += "</div>";
      h += '<button class="ws-btn main" data-act="review-again">🔁 再复习一轮</button>';
    }
    h += '<div class="ws-nav"><button class="ws-btn" data-act="pick" data-gid="' + (q.group || "") + '">📚 回学习</button>';
    h += '<button class="ws-btn" data-act="goto-stats">📊 看统计</button></div>';
    body.innerHTML = h;
  }

  /* ---------------- 复习 ---------------- */
  function startReview() {
    var weak = Object.keys(byId).filter(function (id) { return isWeak(recOf(id)); }).map(function (id) { return byId[id]; });
    if (!weak.length) { renderStats(); return; }
    var all = Object.keys(byId).map(function (id) { return byId[id]; });
    startQuiz(["zh2en", "en2zh", "listen", "sentence", "spell"], all, "review", { words: shuffle(weak.slice()).slice(0, Math.min(8, weak.length)), group: null });
  }

  /* ---------------- 事件委托 ---------------- */
  document.addEventListener("click", function (ev) {
    var t = ev.target;
    while (t && t !== document) {
      if (t.getAttribute && t.getAttribute("data-act")) { break; }
      t = t.parentNode;
    }
    if (!t || !t.getAttribute) { return; }
    var act = t.getAttribute("data-act");
    var gid = t.getAttribute("data-gid");
    if (act === "tab") { switchTab(t.getAttribute("data-tab")); return; }
    if (act === "checkin") {
      if (checkin()) { renderTop(); refreshCurrent(); toast("📅 打卡成功 +10⭐"); }
      else { toast("今天已经打过卡啦"); }
      return;
    }
    if (act === "pick") { openGroup(gid); return; }
    if (act === "drill-start") { startDrill(gid); return; }
    if (act === "c-prev") { if (learn.idx > 0) { resetRecorder(); learn.idx--; renderCard(); } return; }
    if (act === "c-next") { resetRecorder(); learn.idx++; renderCard(); return; }
    if (act === "c-speak") { if (learn.list[learn.idx]) { sayWord(learn.list[learn.idx].w); } return; }
    if (act === "c-ex") { if (learn.list[learn.idx]) { sayEx(learn.list[learn.idx].w); } return; }
    if (act === "c-rec-start") { startRecording(); return; }
    if (act === "c-rec-stop") { stopRecording(); return; }
    if (act === "c-rec-play") { playRecording(); return; }
    if (act === "c-rec-redo") { resetRecorder(); renderCard(); return; }
    if (act === "c-done") { switchTab("drill"); startDrill(gid || state.curGroup); return; }
    if (act === "test-pick") { if (gid) { testCfg.gid = gid; renderTestCfg(); } else { renderTestSetup(); } return; }
    if (act === "test-num") { testCfg.count = parseInt(t.getAttribute("data-n"), 10); renderTestCfg(); return; }
    if (act === "test-start") { if (testCfg.gid) { startQuiz(["zh2en", "en2zh", "listen", "sentence", "spell"], wordsOf(testCfg.gid), "test", { count: testCfg.count, group: testCfg.gid }); } return; }
    if (act === "answer") { answer(parseInt(t.getAttribute("data-i"), 10)); return; }
    if (act === "q-play") { var q = quiz.list[quiz.i]; if (q.play) { q.play(); } return; }
    if (act === "q-next") { quiz.i++; renderQuestion(); return; }
    if (act === "review-start" || act === "review-again") { startReview(); return; }
    if (act === "w-say") { var it2 = byId[gid]; if (it2) { sayWord(it2.w); } return; }
    if (act === "goto-stats") { switchTab("stats"); return; }
    /* 拼写键盘 */
    if (act === "s-key") { addKey(t.getAttribute("data-k")); return; }
    if (act === "s-back") { backKey(); return; }
    if (act === "s-clear") { clearKey(); return; }
    if (act === "s-ok") { checkSpell(); return; }
  });

  var typed = "";
  function addKey(k) {
    if (!quiz || quiz.i >= quiz.list.length) { return; }
    var w = quiz.list[quiz.i].target.w.w;
    if (typed.length >= w.length) { return; }
    typed += k;
    updateSpellBox();
  }
  function backKey() { typed = typed.slice(0, -1); updateSpellBox(); }
  function clearKey() { typed = ""; updateSpellBox(); }
  function updateSpellBox() {
    var w = quiz.list[quiz.i].target.w.w;
    var box = document.getElementById("spell-word");
    if (box) {
      var shown = w.split("").map(function (c, i) { return typed[i] ? typed[i].toUpperCase() : "_"; });
      box.innerHTML = shown.join(" ");
    }
  }
  function checkSpell() {
    if (!quiz || quiz.locked || quiz.i >= quiz.list.length) { return; }
    var q = quiz.list[quiz.i];
    quiz.locked = true;
    var ok = typed.toLowerCase() === q.target.w.w.toLowerCase();
    updateRecAfter(q.target.id, ok);
    if (ok) { quiz.right++; addStars(1); }
    else { quiz.wrong++; quiz.wrongWords.push(q.target); }
    var fb = document.getElementById("ws-fb");
    if (ok) {
      fb.innerHTML = '<div class="ws-fb-ok">✅ 拼对啦！+' + "1星" + "</div>";
      fb.innerHTML += '<button class="ws-btn" data-act="q-next">下一题 →</button>';
    } else {
      fb.innerHTML = '<div class="ws-fb-no">❌ 正确答案是 <b>' + q.target.w.w + "</b></div>";
      fb.innerHTML += '<button class="ws-btn" data-act="q-next">下一题 →</button>';
    }
    var box = document.getElementById("spell-word");
    if (box) { box.innerHTML = q.target.w.w.toUpperCase().split("").join(" "); box.style.color = ok ? "var(--green)" : "var(--red)"; }
  }

  /* ---------------- Tab 切换 ---------------- */
  var currentTab = "learn";
  function switchTab(tab) {
    if (tab !== "learn" && recState !== "idle") { resetRecorder(); }
    currentTab = tab;
    document.querySelectorAll(".ws-tab").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-tab") === tab); });
    if (tab === "learn") { renderGroups(); }
    else if (tab === "drill") { renderDrillHome(); }
    else if (tab === "test") { renderTestSetup(); }
    else if (tab === "stats") { renderStats(); }
  }
  function refreshCurrent() {
    if (currentTab === "learn") { renderGroups(); }
    else if (currentTab === "drill") { renderDrillHome(); }
    else if (currentTab === "test") { renderTestSetup(); }
    else if (currentTab === "stats") { renderStats(); }
  }
  function renderDrillHome() {
    var h = '<div class="ws-sec-title">闯关练习</div>';
    h += '<div class="ws-empty">选择一个主题开始练习（学习新词后，或用主题列表直接练）。</div>';
    h += '<div class="ws-groups">';
    groupMeta.forEach(function (g) {
      h += '<button class="ws-group" data-act="drill-start" data-gid="' + g.id + '">';
      h += '<div class="ws-group-em">' + g.em + '</div><div class="ws-group-name">' + g.name + "</div>";
      h += '<div class="ws-group-sub">' + g.count + "词 · 混合题型</div></button>";
    });
    h += "</div>";
    body.innerHTML = h;
  }
  function startDrill(gid) {
    if (!gid) { return; }
    startQuiz(["zh2en", "en2zh", "listen", "sentence", "spell"], wordsOf(gid), "drill", { count: 8, group: gid });
  }

  /* ---------------- toast ---------------- */
  function toast(msg) {
    var old = document.querySelector(".ws-toast");
    if (old) { old.remove(); }
    var d = el('<div class="ws-toast">' + msg + "</div>");
    document.body.appendChild(d);
    setTimeout(function () { d.classList.add("hide"); setTimeout(function () { d.remove(); }, 300); }, 1400);
  }

  /* ---------------- 启动 ---------------- */
  renderTop();
  switchTab("learn");
})();
