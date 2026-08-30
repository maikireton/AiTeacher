/* ============================================================
 * AI 教师 · 知识库查询函数（kb-utils.js）
 * 供导航主页 / 学科索引页 / 回顾系统复用的纯查询函数（不依赖 DOM）
 * 依赖：knowledge-base.js（window.KNOWLEDGE_BASE）
 * 职责：只查数据，不判定学习状态（薄弱点判定归 record.js）
 * ============================================================ */
(function () {
  "use strict";

  var BASE = window.KNOWLEDGE_BASE;
  var kps = (BASE && Array.isArray(BASE.knowledgePoints)) ? BASE.knowledgePoints : [];

  /* 按 ID 查知识点对象；不存在返回 null */
  function get(kpId) {
    for (var i = 0; i < kps.length; i++) {
      if (kps[i].id === kpId) { return kps[i]; }
    }
    return null;
  }

  /* 学科下的全部知识点 */
  function bySubject(subjectId) {
    return kps.filter(function (k) { return k.subject === subjectId; });
  }

  /* 学科 + 年级 */
  function byGrade(subjectId, grade) {
    return kps.filter(function (k) { return k.subject === subjectId && k.grade === grade; });
  }

  /* 按状态筛选 */
  function byStatus(status) {
    return kps.filter(function (k) { return k.status === status; });
  }

  /* 按来源筛选（教材 / 按需补充） */
  function bySource(source) {
    return kps.filter(function (k) { return k.source === source; });
  }

  /* 搜索：匹配 name / summary / keywords（大小写不敏感、模糊） */
  function search(text) {
    var q = String(text || "").trim().toLowerCase();
    if (!q) { return kps.slice(); }
    return kps.filter(function (k) {
      if ((k.name || "").toLowerCase().indexOf(q) !== -1) { return true; }
      if ((k.summary || "").toLowerCase().indexOf(q) !== -1) { return true; }
      var kw = k.keywords || [];
      for (var i = 0; i < kw.length; i++) {
        if (String(kw[i]).toLowerCase().indexOf(q) !== -1) { return true; }
      }
      return false;
    });
  }

  /* 前置知识点对象数组（不存在 ID 跳过并 console.warn） */
  function prereqs(kpId) {
    var k = get(kpId);
    if (!k || !Array.isArray(k.prerequisiteIds)) { return []; }
    return k.prerequisiteIds.map(function (pid) {
      var p = get(pid);
      if (!p) { console.warn("[kb-utils] 前置知识点不存在: " + pid + "（来自 " + kpId + "）"); }
      return p;
    }).filter(Boolean);
  }

  /* 学科 id → 中文名 */
  function subjectName(subjectId) {
    if (!BASE || !Array.isArray(BASE.subjects)) { return subjectId; }
    for (var i = 0; i < BASE.subjects.length; i++) {
      if (BASE.subjects[i].id === subjectId) { return BASE.subjects[i].name; }
    }
    return subjectId;
  }

  /* 模块 id → 中文名 */
  function moduleName(moduleId) {
    if (!BASE || !Array.isArray(BASE.modules)) { return moduleId; }
    for (var i = 0; i < BASE.modules.length; i++) {
      if (BASE.modules[i].id === moduleId) { return BASE.modules[i].name; }
    }
    return moduleId;
  }

  window.KB = {
    get: get,
    bySubject: bySubject,
    byGrade: byGrade,
    byStatus: byStatus,
    bySource: bySource,
    search: search,
    prereqs: prereqs,
    subjectName: subjectName,
    moduleName: moduleName
  };
})();
