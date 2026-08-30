/* ============================================================
 * AI 教师 · 统一语音工具（voice.js）
 * 所有课件统一从这里发音，保证「设置页保存的音色全局生效」
 * 数据来源：localStorage["aiTeacher:settings"].voice（设置页写入）
 *
 * 关键：speechSynthesis.getVoices() 是异步加载的——页面刚打开时
 * 语音列表往往为空，此时若直接朗读会匹配不到保存的音色（退回默认）。
 * 因此 speak() 在语音列表就绪前会先等待，就绪后再用正确音色朗读；
 * 若迟迟不就绪（系统无语音），1.5s 超时后回退默认中文，不阻塞学习。
 * ============================================================ */
(function () {
  "use strict";

  var SETTINGS_KEY = "aiTeacher:settings";
  var voicesCache = null;
  var voiceReady = false;          // 语音列表是否已就绪
  var pendingQueue = [];           // 等待语音就绪后执行的朗读队列
  var MEM_VOICE_TIMEOUT = 1500;    // 等待上限（ms）

  /* 读取设置（localStorage 受限时降级为内存中的最新值） */
  var memSettings = null;
  function readSettings() {
    if (memSettings) { return memSettings; }
    try {
      var raw = window.localStorage.getItem(SETTINGS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  /* 取设备语音列表（带缓存） */
  function getVoices() {
    if (!("speechSynthesis" in window)) { return []; }
    var all = window.speechSynthesis.getVoices() || [];
    if (all.length) { voicesCache = all; }
    return voicesCache || all;
  }

  function flushPending() {
    if (!voiceReady || !pendingQueue.length) { return; }
    var q = pendingQueue;
    pendingQueue = [];
    for (var i = 0; i < q.length; i++) {
      try { q[i](); } catch (e) { /* 忽略单个失败 */ }
    }
  }

  /* 超时强制执行：即使语音列表始终未就绪也朗读（默认音色兜底，不阻塞学习） */
  function forceFlush() {
    if (!pendingQueue.length) { return; }
    var q = pendingQueue;
    pendingQueue = [];
    for (var i = 0; i < q.length; i++) {
      try { q[i](); } catch (e) { /* 忽略单个失败 */ }
    }
  }

  /* 等待语音列表就绪；超时则直接执行（默认音色兜底） */
  function waitForVoices(cb) {
    pendingQueue.push(cb);
    if (getVoices().length) { ensureReady(); flushPending(); return; }
    setTimeout(function () { forceFlush(); }, MEM_VOICE_TIMEOUT);
  }

  function ensureReady() {
    if (!voiceReady && getVoices().length) { voiceReady = true; }
  }

  /* 语音列表就绪事件（异步加载完成后触发） */
  if ("speechSynthesis" in window && "onvoiceschanged" in window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = function () {
      try { voicesCache = window.speechSynthesis.getVoices() || []; } catch (e) { voicesCache = []; }
      ensureReady();
      flushPending();
    };
  }
  ensureReady(); // 若页面加载时列表已就绪，直接标记

  /* 返回设置页保存的音色对象；未设置/已失效返回 null
   * lang 传 "en" 时取英文音色（voiceEn），其余取中文音色（voice）；
   * 英文未保存时回退到中文音色，保证不会静默。 */
  function pickSavedVoice(lang) {
    var saved = readSettings();
    var isEn = String(lang || "").toLowerCase().indexOf("en") === 0;
    var key = isEn ? "voiceEn" : "voice";
    var savedObj = saved && saved[key];
    if (!savedObj || !savedObj.uri) {
      if (isEn) { return pickSavedVoice("zh"); }
      return null;
    }
    var voices = getVoices();
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].voiceURI === savedObj.uri) { return voices[i]; }
    }
    return null;
  }

  /* 真正朗读（语音列表已就绪后调用） */
  function speakNow(text, opts) {
    if (!("speechSynthesis" in window)) { return; }
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(String(text || ""));
      var v = pickSavedVoice("zh");
      if (v) { u.voice = v; u.lang = v.lang || "zh-CN"; }
      else { u.lang = "zh-CN"; }
      u.rate = (opts && opts.rate) || 0.92;
      u.pitch = (opts && opts.pitch) || 1.05;
      /* onEnd：音频播放结束/中断时回调（供自动播放等读完再前进） */
      if (opts && typeof opts.onEnd === "function") {
        u.onend = function () { try { opts.onEnd(); } catch (e) {} };
        u.onerror = function () { try { opts.onEnd(); } catch (e) {} };
      }
      window.speechSynthesis.speak(u);
    } catch (e) { /* 语音失败不阻塞学习 */ }
  }

  /* 统一朗读入口：语音列表未就绪时等待，就绪后用正确音色 */
  function speak(text, opts) {
    if (!("speechSynthesis" in window)) { return; }
    if (!voiceReady) { waitForVoices(function () { speakNow(text, opts); }); return; }
    speakNow(text, opts);
  }

  /* ============ 中英混读（英语课件专用）============
   * 文本中英文单词/句子用英文音色（en-US）朗读，中文部分用
   * 设置页保存的中文音色朗读，满足文档 4.4「英文用 en-US」的要求。
   * 数学/语文课件文本无英文字母时行为与原来完全一致。 */

  /* 文本是否含英文字母（需要混读） */
  function hasLatin(text) {
    return /[A-Za-z]/.test(String(text || ""));
  }

  /* 中英分段：把「以英文字母开头、连续直到遇到中文为止」的英文串视为一段英文，
   * 其余为中文段。这样英文短语/句子（含空格与标点）会整体连读，不会逐词蹦读。 */
  function splitMixed(text) {
    text = String(text || "");
    var parts = [];
    var re = /[A-Za-z][A-Za-z0-9\s'’.,!?;:()\-—…“”"\/]*/g;
    var last = 0, m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) { parts.push({ text: text.slice(last, m.index), en: false }); }
      parts.push({ text: m[0].replace(/\s+$/g, ""), en: true });
      last = m.index + m[0].length;
    }
    if (last < text.length) { parts.push({ text: text.slice(last), en: false }); }
    return parts.filter(function (p) { return p.text.trim().length > 0; });
  }

  /* 选择语言匹配的音色：先精确匹配，再按语言前缀匹配 */
  function pickVoiceFor(lang) {
    var voices = getVoices();
    var target = String(lang || "").toLowerCase();
    var prefix = target.slice(0, 2);
    var pre = null;
    for (var i = 0; i < voices.length; i++) {
      var l = (voices[i].lang || "").toLowerCase();
      if (l === target) { return voices[i]; }
      if (!pre && l.indexOf(prefix) === 0) { pre = voices[i]; }
    }
    return pre;
  }

  function speakMixedNow(text, opts) {
    if (!("speechSynthesis" in window)) {
      if (opts && typeof opts.onEnd === "function") {
        setTimeout(function () { try { opts.onEnd(); } catch (e) {} }, 1200);
      }
      return;
    }
    var parts = splitMixed(text);
    var i = 0;
    /* 开始前中断上一段语音；段与段之间用 onend 衔接、不再反复 cancel，
     * 避免 Chrome 下 cancel()→speak() 紧连导致丢字/无声 */
    try { window.speechSynthesis.cancel(); } catch (e) {}
    function next() {
      if (i >= parts.length) {
        if (opts && typeof opts.onEnd === "function") { try { opts.onEnd(); } catch (e) {} }
        return;
      }
      var p = parts[i++];
      try {
        var u = new SpeechSynthesisUtterance(p.text);
        if (p.en) {
          /* 英文段：优先用设置页保存的英文音色，未保存则按 en 前缀匹配系统音色 */
          var ev = pickSavedVoice("en") || pickVoiceFor("en-US");
          if (ev) { u.voice = ev; u.lang = ev.lang || "en-US"; }
          else { u.lang = "en-US"; }
        } else {
          var sv = pickSavedVoice("zh") || pickVoiceFor("zh-CN");
          if (sv) { u.voice = sv; u.lang = sv.lang || "zh-CN"; }
          else { u.lang = "zh-CN"; }
        }
        u.rate = (opts && opts.rate) || 0.92;
        u.pitch = (opts && opts.pitch) || 1.05;
        u.onend = next;
        u.onerror = next;
        window.speechSynthesis.speak(u);
      } catch (e) { next(); }
    }
    next();
  }

  /* 中英混读入口：语音列表未就绪时等待 */
  function speakMixed(text, opts) {
    if (!("speechSynthesis" in window)) { return; }
    if (!voiceReady) { waitForVoices(function () { speakMixedNow(text, opts); }); return; }
    speakMixedNow(text, opts);
  }

  window.AiVoice = {
    speak: speak,
    speakMixed: speakMixed,
    hasLatin: hasLatin,
    pickSavedVoice: pickSavedVoice,
    readSettings: readSettings
  };
})();
