/* ============================================================
 * AI 教师 · 回顾系统（record.js）
 * 学习记录：localStorage 读写（key: aiTeacher:records）
 * 能力：完成记录 / 答题统计 / 薄弱点判定 / 今日任务 / 连续打卡 / 统计
 * 依赖：knowledge-base.js（展示时 join 用，判定本身只依赖记录数据）
 * 规范依据：《AI教师-课件制作指导文档》第 6 章
 * 说明：file:// 协议下 localStorage 可能受限，失败自动降级为内存（本次会话有效）
 * ============================================================ */
window.Record = (function () {
  "use strict";

  var KEY = "aiTeacher:records";
  var TASK_KEY = "aiTeacher:dailyTask";
  var SETTINGS_KEY = "aiTeacher:taskSettings";
  var mem = null;

  /* ---------- 存储 ---------- */
  function load() {
    if (mem) { return mem; }
    try {
      var raw = window.localStorage.getItem(KEY);
      mem = raw ? JSON.parse(raw) : {};
    } catch (e) { mem = {}; }
    return mem;
  }
  function save() {
    try { window.localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) { /* 降级：仅本次会话 */ }
  }

  /* ---------- 日期工具 ---------- */
  function fmt(d) {
    var m = d.getMonth() + 1, day = d.getDate();
    return d.getFullYear() + "-" + (m < 10 ? "0" + m : m) + "-" + (day < 10 ? "0" + day : day);
  }
  function today() { return fmt(new Date()); }

  /* ---------- 知识点 ID ---------- */
  /* 从当前页面 URL / 文件名提取知识点 ID（如 math-4-001），用于课件页自报家门 */
  function getKpId() {
    var m = (window.location.pathname || "").match(/(chinese|math|english|science)-\d+-\d+/);
    return m ? m[0] : "";
  }

  /* ---------- 完成记录 ---------- */
  /* data: { date, done, stars, correct, wrong, timeUsed } */
  function logFinish(kpId, data) {
    if (!kpId) { return null; }
    var rec = load();
    var arr = rec[kpId] = rec[kpId] || [];
    var d = {
      date: (data && data.date) || today(),
      done: data && data.done === false ? false : true,
      stars: (data && data.stars) || 0,
      correct: (data && data.correct) || 0,
      wrong: (data && data.wrong) || 0,
      timeUsed: Math.round((data && data.timeUsed) || 0)
    };
    arr.push(d);
    if (arr.length > 20) { arr.splice(0, arr.length - 20); } // 单知识点最多保留 20 条历史
    save();
    return d;
  }

  /* ---------- 查询 ---------- */
  function records(kpId) {
    var rec = load();
    return rec[kpId] || [];
  }
  function last(kpId) {
    var a = records(kpId);
    return a.length ? a[a.length - 1] : null;
  }

  /* 单条记录得分（0-100）；未答题（无对错信息）返回 null */
  function scoreOf(rec) {
    var t = (rec.correct || 0) + (rec.wrong || 0);
    if (t === 0) { return null; }
    return Math.round((rec.correct || 0) / t * 100);
  }

  /* ---------- 薄弱点判定（文档 6.3） ----------
   * 规则：连续 2 次得分 <60%，或近 5 次中 ≥3 次得分 <60% */
  function isWeak(kpId) {
    var arr = records(kpId).filter(function (r) {
      return r.done && (r.correct || 0) + (r.wrong || 0) > 0;
    });
    if (!arr.length) { return false; }
    var scored = arr.map(scoreOf);
    // 规则1：连续 2 次不达标
    if (scored.length >= 2) {
      var lastTwo = scored.slice(-2);
      if (lastTwo[0] !== null && lastTwo[0] < 60 && lastTwo[1] !== null && lastTwo[1] < 60) { return true; }
    }
    // 规则2：近 5 次中 ≥3 次不达标
    var recent = scored.slice(-5).filter(function (s) { return s !== null && s < 60; });
    if (recent.length >= 3) { return true; }
    return false;
  }

  /* 全部薄弱点 ID */
  function weakIds() {
    var rec = load(), out = [];
    for (var k in rec) {
      if (Object.prototype.hasOwnProperty.call(rec, k) && isWeak(k)) { out.push(k); }
    }
    return out;
  }

  /* ---------- 今日 / 打卡 / 统计 ---------- */
  /* 今日已学 kpId 列表（按当天有无记录，done=true） */
  function todayDone() {
    var rec = load(), t = today(), out = [];
    for (var k in rec) {
      if (!Object.prototype.hasOwnProperty.call(rec, k)) { continue; }
      for (var i = 0; i < rec[k].length; i++) {
        if (rec[k][i].date === t && rec[k][i].done) { out.push(k); break; }
      }
    }
    return out;
  }

  /* 连续学习天数（连续打卡，允许今天还没学则从昨天起算） */
  function streak() {
    var rec = load(), days = {};
    for (var k in rec) {
      if (!Object.prototype.hasOwnProperty.call(rec, k)) { continue; }
      rec[k].forEach(function (r) { if (r.done) { days[r.date] = true; } });
    }
    var dates = Object.keys(days);
    if (!dates.length) { return 0; }
    var set = {};
    dates.forEach(function (d) { set[d] = true; });
    var cursor = today();
    if (!set[cursor]) {
      var y = new Date(); y.setDate(y.getDate() - 1);
      cursor = fmt(y);
      if (!set[cursor]) { return 0; }
    }
    var n = 0;
    while (set[cursor]) {
      n++;
      var dt = new Date(cursor); dt.setDate(dt.getDate() - 1);
      cursor = fmt(dt);
    }
    return n;
  }

  /* 汇总统计 */
  function stats() {
    var rec = load(), totalStars = 0, totalDone = 0;
    for (var k in rec) {
      if (!Object.prototype.hasOwnProperty.call(rec, k)) { continue; }
      rec[k].forEach(function (r) {
        if (r.done) { totalDone++; totalStars += (r.stars || 0); }
      });
    }
    return { today: todayDone().length, streak: streak(), totalStars: totalStars, totalDone: totalDone };
  }

  /* ---------- 今日任务推荐（供主页） ----------
   * 规则：每个学科各取 perSubject 个（默认 1），学科间互不抢占；
   * 每科内优先级：薄弱点优先 → 最久未复习优先；
   * 支持按家长设置的年级范围过滤（见 getTaskSettings）。 */
  function recommendList(perSubject) {
    perSubject = (typeof perSubject === "number" && perSubject > 0) ? perSubject : 1;
    var KB = window.KNOWLEDGE_BASE;
    if (!KB || !Array.isArray(KB.knowledgePoints)) { return []; }
    var settings = getTaskSettings();
    var grades = settings.grades; // null=全部年级
    var doneSet = {};
    todayDone().forEach(function (k) { doneSet[k] = true; });
    var weakSet = {};
    weakIds().forEach(function (k) { weakSet[k] = true; });

    // 学科顺序：按知识库学科字典
    var subjects = (KB.subjects || []).map(function (s) { return s.id; });
    var out = [];
    subjects.forEach(function (subj) {
      var cands = KB.knowledgePoints.filter(function (k) {
        return k.subject === subj && k.status === "已完成" && k.file && !doneSet[k.id] &&
          (!grades || grades.indexOf(k.grade) !== -1);
      }).sort(byLastStudy);
      if (!cands.length) { return; }
      var weak = cands.filter(function (k) { return weakSet[k.id]; });
      var rest = cands.filter(function (k) { return !weakSet[k.id]; });
      var take = [];
      for (var i = 0; i < weak.length && take.length < perSubject; i++) { take.push(weak[i]); }
      for (var j = 0; j < rest.length && take.length < perSubject; j++) { take.push(rest[j]); }
      out = out.concat(take);
    });
    return out;
  }

  /* 兼容：返回单个推荐（取推荐列表第一个） */
  function recommend(knowledgeBase) {
    return recommendList(1)[0] || null;
  }

  /* ---------- 任务抽取设置（家长可配） ----------
   * 格式：{ grades: [3,4] } 抽取指定年级；{ grades: null } 全部年级 */
  function getTaskSettings() {
    try {
      var raw = window.localStorage.getItem(SETTINGS_KEY);
      if (raw) {
        var s = JSON.parse(raw);
        if (s && Array.isArray(s.grades) && s.grades.length) {
          return { grades: s.grades.map(function (g) { return +g; }).sort() };
        }
      }
    } catch (e) { /* 忽略 */ }
    return { grades: null };
  }
  function saveTaskSettings(s) {
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify({ grades: (s && Array.isArray(s.grades) && s.grades.length) ? s.grades.map(function (g) { return +g; }) : null }));
    } catch (e) { /* 忽略 */ }
  }
  function sameSettings(a, b) {
    if (!a && !b) { return true; }
    if (!a || !b) { return false; }
    var ga = a.grades, gb = b.grades;
    if (ga && gb) {
      if (ga.length !== gb.length) { return false; }
      return ga.every(function (g) { return gb.indexOf(g) !== -1; });
    }
    return !ga && !gb;
  }

  /* ---------- 当日任务（锁定制） ----------
   * 当天第一次调用时生成并锁定任务（每个学科各一个），当天内固定不变；
   * 学完一个标记一个，不因完成而补新的。第二天自动重新生成；
   * 家长修改抽取年级后，当天任务按新设置重新生成。 */
  function dailyTask() {
    var rec = loadTask();
    var curSettings = getTaskSettings();
    if (rec && rec.date === today() && Array.isArray(rec.ids) && rec.ids.length &&
        sameSettings(rec.settings, curSettings)) {
      return rec;
    }
    var list = recommendList(1);
    var task = { date: today(), ids: list.map(function (k) { return k.id; }), settings: curSettings };
    saveTask(task);
    return task;
  }
  function loadTask() {
    try {
      var raw = window.localStorage.getItem(TASK_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function saveTask(t) {
    try { window.localStorage.setItem(TASK_KEY, JSON.stringify(t)); } catch (e) { /* 降级 */ }
  }

  /* 按「最近学习日期」排序：没学过的排最前（优先新学），学得越久远的越靠前（优先复习） */
  function byLastStudy(a, b) {
    var la = last(a.id), lb = last(b.id);
    var da = la ? la.date : "0000-00-00";
    var db = lb ? lb.date : "0000-00-00";
    if (da !== db) { return da < db ? -1 : 1; }
    return a.id < b.id ? -1 : 1;
  }

  return {
    KEY: KEY,
    getKpId: getKpId,
    logFinish: logFinish,
    records: records,
    last: last,
    scoreOf: scoreOf,
    isWeak: isWeak,
    weakIds: weakIds,
    todayDone: todayDone,
    streak: streak,
    stats: stats,
    recommend: recommend,
    recommendList: recommendList,
    dailyTask: dailyTask,
    getTaskSettings: getTaskSettings,
    saveTaskSettings: saveTaskSettings,
    today: today
  };
})();

/* ============================================================
 * 选择题选项随机化（record.js 版，覆盖未加载 player-core.js 的课件，
 * 如 math-4-001 样板课件——它只引用 record.js + voice.js）。
 * 所有课件的选择题最终都以 <div class="opt" data-ok="0|1"> 渲染进 DOM。
 * 监听新增选项并打乱同一题容器内选项顺序——正确答案位置每次随机，
 * 避免孩子靠“答案总在第一个”蒙对。答对/答错仍按元素 data-ok 判定。
 * data-shuffled 标记同一容器只洗一次；步骤重进容器重建会重新随机。
 * ============================================================ */
(function () {
  if (typeof MutationObserver === "undefined") { return; }
  window.__shuffleReady = true;

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
})();
