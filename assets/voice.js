/* ============================================================
 * AI 教师 · 统一语音工具（voice.js）
 * 所有课件统一从这里发音，保证「设置页保存的音色全局生效」
 * 数据来源：localStorage["aiTeacher:settings"].voice（设置页写入）
 * 用法：window.AiVoice.speak(text)
 * 无外部依赖，供任意页面（含 file:// 本地打开）使用
 * ============================================================ */
(function () {
  "use strict";

  var SETTINGS_KEY = "aiTeacher:settings";
  var voicesCache = null;

  /* 读取设置（localStorage 受限时降级为内存中的最新值） */
  var memSettings = null;
  function readSettings() {
    if (memSettings) { return memSettings; }
    try {
      var raw = window.localStorage.getItem(SETTINGS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  /* 取设备语音列表（带缓存，配合 voiceschanged 刷新） */
  function getVoices() {
    if (!("speechSynthesis" in window)) { return []; }
    var all = window.speechSynthesis.getVoices() || [];
    if (all.length) { voicesCache = all; }
    return voicesCache || all;
  }
  if ("speechSynthesis" in window && "onvoiceschanged" in window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = function () {
      try { voicesCache = window.speechSynthesis.getVoices() || []; } catch (e) { /* 忽略 */ }
    };
  }

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

  /* 统一朗读入口：优先用保存的音色，回退默认中文 */
  function speak(text, opts) {
    if (!("speechSynthesis" in window)) { return; }
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(String(text || ""));
      var v = pickSavedVoice();
      if (v) { u.voice = v; u.lang = v.lang || "zh-CN"; }
      else { u.lang = "zh-CN"; }
      u.rate = (opts && opts.rate) || 0.92;
      u.pitch = (opts && opts.pitch) || 1.05;
      window.speechSynthesis.speak(u);
    } catch (e) { /* 语音失败不阻塞学习 */ }
  }

  window.AiVoice = {
    speak: speak,
    pickSavedVoice: pickSavedVoice,
    readSettings: readSettings
  };
})();
