/* ============================================================
 * AI 教师 · 通用学科索引页逻辑（index-page.js）
 * 供 语文/index.html、数学/index.html、英语/index.html 共用
 * 依赖：knowledge-base.js + kb-utils.js + window.CURRENT_SUBJECT
 * 职责：从单一数据源渲染当前学科的筛选区与知识点卡片列表
 * ============================================================ */
(function () {
  "use strict";
  try {
    var SUBJECT = window.CURRENT_SUBJECT || "math";
    var util = window.KB;
    var KB = window.KNOWLEDGE_BASE;
    if (!util || !KB) { console.error("[index-page] 数据源未加载"); return; }

    /* 薄弱点集合（回顾系统 record.js 判定） */
    var weakSet = {};
    if (window.Record) {
      window.Record.weakIds().forEach(function (k) { weakSet[k] = true; });
    }

    var searchEl = document.getElementById("search");
    var filtersEl = document.getElementById("filters");
    var listEl = document.getElementById("list");
    if (!filtersEl || !listEl) { return; }

    var kps = util.bySubject(SUBJECT).slice().sort(function (a, b) {
      if (a.grade !== b.grade) { return a.grade - b.grade; }
      return a.id < b.id ? -1 : 1;
    });

    var st = { grade: 0, diff: "", status: "", source: "", q: "" };

    /* ---------- 收集筛选项 ---------- */
    var grades = [];
    var diffs = ["基础", "提高", "挑战"];
    var statuses = ["待制作", "已完成", "待修订"];
    var sources = ["syllabus", "custom"];
    kps.forEach(function (k) { if (grades.indexOf(k.grade) === -1) { grades.push(k.grade); } });
    grades.sort(function (a, b) { return a - b; });

    function renderFilters() {
      var html = "";
      html += '<div class="fgroup"><b>年级</b>';
      html += '<button class="fbtn' + (st.grade === 0 ? " on" : "") + '" data-g="0">全部</button>';
      grades.forEach(function (g) {
        html += '<button class="fbtn' + (st.grade === g ? " on" : "") + '" data-g="' + g + '">' + g + "年级</button>";
      });
      html += "</div>";

      html += '<div class="fgroup"><b>难度</b>';
      html += '<button class="fbtn' + (st.diff === "" ? " on" : "") + '" data-d="">全部</button>';
      diffs.forEach(function (d) {
        html += '<button class="fbtn' + (st.diff === d ? " on" : "") + '" data-d="' + d + '">' + d + "</button>";
      });
      html += "</div>";

      html += '<div class="fgroup"><b>状态</b>';
      html += '<button class="fbtn' + (st.status === "" ? " on" : "") + '" data-s="">全部</button>';
      statuses.forEach(function (s) {
        html += '<button class="fbtn' + (st.status === s ? " on" : "") + '" data-s="' + s + '">' + s + "</button>";
      });
      html += "</div>";

      html += '<div class="fgroup"><b>来源</b>';
      html += '<button class="fbtn' + (st.source === "" ? " on" : "") + '" data-c="">全部</button>';
      html += '<button class="fbtn' + (st.source === "syllabus" ? " on" : "") + '" data-c="syllabus">教材</button>';
      html += '<button class="fbtn' + (st.source === "custom" ? " on" : "") + '" data-c="custom">我的补充</button>';
      html += "</div>";

      filtersEl.innerHTML = html;
    }

    /* ---------- 渲染卡片 ---------- */
    function statusLabel(k) { return k.status || "待制作"; }
    function renderList() {
      var items = kps.filter(function (k) {
        if (st.grade && k.grade !== st.grade) { return false; }
        if (st.diff && k.difficulty !== st.diff) { return false; }
        if (st.status && statusLabel(k) !== st.status) { return false; }
        if (st.source && k.source !== st.source) { return false; }
        if (st.q) {
          var kw = (k.name + " " + k.summary + " " + (k.keywords || []).join(" ")).toLowerCase();
          if (kw.indexOf(st.q) === -1) { return false; }
        }
        return true;
      });

      if (!items.length) {
        listEl.innerHTML = '<div class="empty">没有符合条件的知识点，换个筛选试试～</div>';
        return;
      }

      var html = "";
      items.forEach(function (k) {
        var stt = statusLabel(k);
        var cls = "";
        var right = "";
        if (stt === "待制作") { cls = "todo"; right = '<span class="soon">课件制作中…</span>'; }
        else if (stt === "待修订") { cls = "revise"; right = '<span class="revise-tip">待按课本校对</span>'; }
        var base = window.INDEX_BASE || "";
        var href = (stt === "已完成" && k.file) ? base + k.file : "javascript:void(0)";

        html += '<a class="kp ' + cls + '" href="' + href + '"' +
          (stt !== "已完成" ? ' aria-disabled="true"' : "") + ">";
        html += '<div class="name">' +
          (weakSet[k.id] ? '<span class="dot-weak" title="薄弱点，建议先复习"></span>' : "") +
          k.name + "</div>";
        html += '<div class="summary">' + k.summary + "</div>";
        html += '<div class="tags">';
        html += '<span class="tag grade">' + k.grade + "年级·" + (k.term || "") + "</span>";
        html += '<span class="tag diff-' + k.difficulty + '">' + k.difficulty + "</span>";
        html += '<span class="tag' + (k.source === "custom" ? " src-custom" : "") + '">' +
          (k.source === "custom" ? "我的补充" : "教材") + "</span>";
        html += '<span class="tag">' + util.moduleName(k.module) + "</span>";
        html += '<span class="tag">' + k.unit + "</span>";
        html += right ? right : "";
        html += "</div></a>";
      });
      listEl.innerHTML = html;
    }

    function render() { renderFilters(); renderList(); }

    /* ---------- 事件绑定 ---------- */
    filtersEl.addEventListener("click", function (ev) {
      var t = ev.target;
      if (!t || t.tagName !== "BUTTON") { return; }
      if (t.hasAttribute("data-g")) { st.grade = parseInt(t.getAttribute("data-g"), 10) || 0; }
      if (t.hasAttribute("data-d")) { st.diff = t.getAttribute("data-d"); }
      if (t.hasAttribute("data-s")) { st.status = t.getAttribute("data-s"); }
      if (t.hasAttribute("data-c")) { st.source = t.getAttribute("data-c"); }
      render();
    });
    if (searchEl) {
      searchEl.addEventListener("input", function () {
        st.q = searchEl.value.trim().toLowerCase();
        renderList();
      });
    }

    render();
  } catch (e) {
    console.error("[index-page] 渲染失败:", e);
  }
})();
