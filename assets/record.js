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
   * 优先级：薄弱点 → 最久未复习的已完成课件 → 第一个已完成课件 */
  function recommend(knowledgeBase) {
    var KB = knowledgeBase || window.KNOWLEDGE_BASE;
    if (!KB || !Array.isArray(KB.knowledgePoints)) { return null; }
    var doneSet = {};
    todayDone().forEach(function (k) { doneSet[k] = true; });
    // 候选：已制作完成、可点击、今日还没学过
    var cands = KB.knowledgePoints.filter(function (k) {
      return k.status === "已完成" && k.file && !doneSet[k.id];
    });
    if (!cands.length) { return null; }
    // 优先薄弱点
    var weakSet = {};
    weakIds().forEach(function (k) { weakSet[k] = true; });
    var weakCands = cands.filter(function (k) { return weakSet[k.id]; });
    if (weakCands.length) {
      return weakCands.sort(byLastStudy).slice(0, 1)[0];
    }
    // 其次：最久没复习的（按最近一次学习日期升序排，无记录的最前）
    return cands.sort(byLastStudy).slice(0, 1)[0];
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
    today: today
  };
})();
