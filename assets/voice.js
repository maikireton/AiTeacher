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

  /* 返回设置页保存的音色对象；未设置/已失效返回 null */
  function pickSavedVoice() {
    var saved = readSettings();
    if (!saved || !saved.voice || !saved.voice.uri) { return null; }
    var voices = getVoices();
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].voiceURI === saved.voice.uri) { return voices[i]; }
    }
    return null;
  }

  /* 真正朗读（语音列表已就绪后调用） */
  function speakNow(text, opts) {
    if (!("speechSynthesis" in window)) { return; }
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(String(text || ""));
      var v = pickSavedVoice();
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

  window.AiVoice = {
    speak: speak,
    pickSavedVoice: pickSavedVoice,
    readSettings: readSettings
  };
})();
