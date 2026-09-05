/* ============================================================
 * AI 教师 · 英语查词（dict.js）
 *
 * 数据源：
 *  1. 本地词库 assets/dict-data.json（从有道词典预抓取，含音标/词性释义/双语例句，
 *     离线可用、毫秒级响应，覆盖小学 PEP 三四年级 + 课件词汇）
 *  2. 未命中 → 有道 suggest 在线兜底（JSONP 绕过跨域，返回词性+释义）
 *  3. 发音 → 有道真人发音 dictvoice（英音 type=1 / 美音 type=2）
 *
 * 用法：
 *  Dict.openCard(word)                打开查词卡片（自动查词+渲染）
 *  Dict.lookup(word, cb)              查词：cb(data) data={uk,us,defs,ex,src:"local"|"online"|null}
 *  Dict.playVoice(word, type)         播放发音 type=1英/2美
 *  加载后自动绑定"点英文单词查词"（事件委托，白名单排除交互元素）
 * ============================================================ */
(function () {
  "use strict";

  var DATA_URL = (function () {
    try {
      var cur = document.currentScript;
      return cur && cur.src ? cur.src.replace(/[^/]*$/, "") + "dict-data.json" : "assets/dict-data.json";
    } catch (e) { return "assets/dict-data.json"; }
  })();
  var SUGGEST_URL = "https://dict.youdao.com/suggest?num=5&doctype=json&q=";
  var VOICE_URL = "https://dict.youdao.com/dictvoice?type=";

  var dictData = null;      // 本地词库
  var cardEl = null;        // 查词卡片根元素
  var pendingWord = null;   // 正在查询的词

  /* ---------- 本地词库加载 ---------- */
  var dataPromise = null;
  function loadData() {
    if (dataPromise) { return dataPromise; }
    dataPromise = fetch(DATA_URL, { cache: "force-cache" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; })
      .then(function (d) { dictData = d || {}; return dictData; });
    return dataPromise;
  }

  /* ---------- JSONP（绕跨域查有道 suggest） ---------- */
  function jsonp(url) {
    return new Promise(function (resolve, reject) {
      var cb = "__dict_cb_" + Date.now() + "_" + Math.floor(Math.random() * 1e6);
      var s = null, timer = null, done = false;
      function cleanup() {
        if (done) { return; }
        done = true;
        try { delete window[cb]; } catch (e) { window[cb] = undefined; }
        if (s && s.parentNode) { s.parentNode.removeChild(s); }
        if (timer) { clearTimeout(timer); }
      }
      window[cb] = function (data) { cleanup(); resolve(data); };
      s = document.createElement("script");
      s.src = url + "&callback=" + cb;
      s.onerror = function () { cleanup(); reject(new Error("jsonp error")); };
      timer = setTimeout(function () { cleanup(); reject(new Error("timeout")); }, 6000);
      document.head.appendChild(s);
    });
  }

  /* ---------- 查词 ---------- */
  function lookup(word, cb) {
    word = String(word || "").trim().toLowerCase();
    if (!word) { cb && cb(null); return; }
    loadData().then(function () {
      var hit = dictData[word];
      if (hit) {
        cb && cb({ uk: hit.uk, us: hit.us, defs: hit.defs || [], ex: hit.ex || [], src: "local" });
        return;
      }
      /* 在线兜底 */
      jsonp(SUGGEST_URL + encodeURIComponent(word))
        .then(function (d) {
          var entries = (d && d.data && d.data.entries) || [];
          var exact = null;
          for (var i = 0; i < entries.length; i++) {
            if (String(entries[i].entry || "").toLowerCase() === word) { exact = entries[i]; break; }
          }
          var e = exact || entries[0];
          if (e && e.explain) {
            cb && cb({ uk: null, us: null, defs: [e.explain], ex: [], src: "online" });
          } else {
            cb && cb(null);
          }
        })
        .catch(function () { cb && cb(null); });
    });
  }

  /* ---------- 真人发音 ---------- */
  function playVoice(word, type) {
    word = String(word || "");
    if (!word) { return; }
    try {
      var a = new Audio(VOICE_URL + (type === 2 ? 2 : 1) + "&audio=" + encodeURIComponent(word));
      a.play().catch(function () {});
    } catch (e) {}
  }

  /* ---------- 查词卡片 UI ---------- */
  function buildCard() {
    if (cardEl) { return; }
    var mask = document.createElement("div");
    mask.id = "dict-mask";
    mask.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9999;display:none;align-items:center;justify-content:center;padding:16px;";
    mask.addEventListener("click", function (e) { if (e.target === mask) { closeCard(); } });
    var card = document.createElement("div");
    card.id = "dict-card";
    card.style.cssText = "background:#fff;border-radius:18px;max-width:520px;width:100%;max-height:82vh;overflow-y:auto;padding:20px 22px;font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;box-shadow:0 12px 40px rgba(0,0,0,.25);";
    card.innerHTML = "";
    mask.appendChild(card);
    document.body.appendChild(mask);
    cardEl = card;
    maskEl = mask;
  }
  var maskEl = null;

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function renderCard(word, data, loading) {
    var h = "";
    /* 关闭按钮 */
    h += '<button aria-label="关闭" style="position:absolute;top:10px;right:12px;border:none;background:rgba(0,0,0,.06);color:#666;font-size:18px;width:32px;height:32px;border-radius:50%;cursor:pointer;line-height:1;" onclick="document.getElementById(\'dict-mask\').style.display=\'none\'">✕</button>';
    h += '<div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;">';
    h += '<span style="font-size:30px;font-weight:800;color:#1a1a2e;">' + esc(word) + "</span>";
    if (data && (data.uk || data.us)) {
      h += '<span style="font-size:15px;color:#666;">' +
        (data.uk ? "英 /" + esc(data.uk) + "/" : "") +
        (data.us ? "　美 /" + esc(data.us) + "/" : "") + "</span>";
    }
    h += "</div>";
    /* 发音按钮 */
    if (data) {
      h += '<div style="margin:10px 0 6px;">' +
        '<button onclick="window.__dictPlay(\'' + esc(word).replace(/'/g, "\\'") + '\',1)" style="background:#3b6ef5;color:#fff;border:none;border-radius:20px;padding:8px 16px;font-size:14px;cursor:pointer;margin-right:8px;">🇬🇧 英式发音</button>' +
        '<button onclick="window.__dictPlay(\'' + esc(word).replace(/'/g, "\\'") + '\',2)" style="background:#3b6ef5;color:#fff;border:none;border-radius:20px;padding:8px 16px;font-size:14px;cursor:pointer;">🇺🇸 美式发音</button>' +
        "</div>";
    }
    if (loading) {
      h += '<p style="color:#999;font-size:14px;margin:14px 0;">正在查词…</p>';
    } else if (!data) {
      h += '<p style="color:#c0392b;font-size:15px;margin:14px 0;">没有找到这个词的释义，可能拼写有误，或它不在小学词汇里。</p>';
    } else {
      /* 释义 */
      if (data.defs && data.defs.length) {
        h += '<div style="margin:12px 0 0;">';
        data.defs.forEach(function (d, i) {
          var m = d.match(/^([a-zA-Z]+\.|v\.|adj\.|adv\.|prep\.|conj\.|pron\.|num\.|art\.|abbr\.)/);
          var pos = m ? '<span style="background:#eef2ff;color:#3b6ef5;border-radius:6px;padding:1px 7px;font-size:12px;margin-right:8px;white-space:nowrap;">' + esc(m[1]) + "</span>" : "";
          var rest = m ? d.slice(m[0].length).trim() : d;
          h += '<div style="display:flex;align-items:flex-start;gap:8px;margin:6px 0;font-size:16px;color:#222;">' +
            pos + '<span>' + esc(rest) + "</span></div>";
        });
        h += "</div>";
      }
      /* 例句 */
      if (data.ex && data.ex.length) {
        h += '<div style="border-top:1px dashed #ddd;margin-top:12px;padding-top:10px;">';
        data.ex.slice(0, 2).forEach(function (x) {
          h += '<div style="margin:8px 0;font-size:15px;color:#222;">' + esc(x.en) + "</div>" +
            (x.cn ? '<div style="font-size:13px;color:#888;margin-top:2px;">' + esc(x.cn) + "</div>" : "");
        });
        h += "</div>";
      }
      if (data.src === "online") {
        h += '<p style="font-size:11px;color:#bbb;margin-top:10px;">在线释义（网络词典）· 本地词库暂未收录</p>';
      }
    }
    cardEl.innerHTML = h;
  }

  window.__dictPlay = playVoice;

  function closeCard() {
    if (maskEl) { maskEl.style.display = "none"; }
  }

  function openCard(word) {
    word = String(word || "").trim().toLowerCase();
    if (!word || word.length < 2 || word.length > 24) { return; }
    buildCard();
    maskEl.style.display = "flex";
    renderCard(word, null, true);
    if (pendingWord === word) { return; }
    pendingWord = word;
    lookup(word, function (data) {
      if (pendingWord !== word) { return; }
      renderCard(word, data, false);
    });
  }

  /* ---------- 点英文单词查词（事件委托） ---------- */
  function initTapToLookup() {
    document.addEventListener("click", function (e) {
      if (e.defaultPrevented) { return; }
      var t = e.target;
      if (!t || t.nodeType !== 1) { return; }
      if (t.closest) {
        if (t.closest("button,a,select,input,textarea,label,.opt,[data-ok],[data-wrong],.btn,.dot,#dict-card,#dict-mask,[onclick]")) { return; }
      }
      var txt = (t.textContent || "").trim();
      if (!/^[A-Za-z][A-Za-z'’-]{1,22}$/.test(txt)) { return; }
      if (txt.length < 2 || txt.length > 20) { return; }
      openCard(txt);
    }, true);
  }

  /* ---------- 对外 API ---------- */
  window.Dict = {
    lookup: lookup,
    openCard: openCard,
    closeCard: closeCard,
    playVoice: playVoice,
    isLocalReady: function () { return !!dictData; }
  };

  /* 加载词库（预热）+ 绑定点词 */
  loadData();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTapToLookup);
  } else {
    initTapToLookup();
  }
})();
