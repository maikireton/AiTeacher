/* ============================================================
 * AI 教师 · 在线音色引擎（voice-online.js）
 *
 * 背景：Android pad 等设备的 Chrome/Edge（Chromium 内核）对系统
 * speechSynthesis 支持受限，getVoices() 返回空 → 设置页无法选音色。
 * 本项目内置「在线音色」：直接连接微软 Edge 朗读服务（edge-tts，
 * 免费、国内可访问、不依赖设备系统语音），pad/电脑都能用。
 *
 * 用法：
 *   window.OnlineVoice.getVoices()          // 返回可用在线音色列表
 *   window.OnlineVoice.speak(text, opts)    // 朗读；opts: {voice, lang, rate, onEnd}
 *
 * 依赖：WebSocket + crypto.subtle（现代浏览器均支持）
 * ============================================================ */
(function () {
  "use strict";

  var TRUSTED_CLIENT_TOKEN = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
  var WSS_BASE = "wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1";
  var SEC_MS_GEC_VERSION = "1-143.0.3650.75";
  var WIN_EPOCH = 11644473600;
  var TIMEOUT = 20000; // 单次朗读最长等待（ms）

  /* 在线音色列表（微软 Edge 免费语音，常用中英文音色） */
  var VOICES = [
    /* 中文 */
    { uri: "zh-CN-XiaoxiaoNeural",  name: "晓晓（女声，推荐）",   lang: "zh-CN", zh: true },
    { uri: "zh-CN-XiaoyiNeural",    name: "晓伊（女声）",         lang: "zh-CN", zh: true },
    { uri: "zh-CN-YunxiNeural",     name: "云希（男声）",         lang: "zh-CN", zh: true },
    { uri: "zh-CN-YunjianNeural",   name: "云健（男声）",         lang: "zh-CN", zh: true },
    { uri: "zh-CN-YunyangNeural",   name: "云扬（男声，新闻）",   lang: "zh-CN", zh: true },
    { uri: "zh-CN-YunxiaNeural",    name: "云夏（少年男声）",     lang: "zh-CN", zh: true },
    { uri: "zh-CN-liaoning-XiaobeiNeural", name: "晓北（东北女声）", lang: "zh-CN", zh: true },
    { uri: "zh-CN-shaanxi-XiaoniNeural",   name: "晓妮（陕西女声）", lang: "zh-CN", zh: true },
    /* 英文 */
    { uri: "en-US-AriaNeural",     name: "Aria（美音女声）",     lang: "en-US", zh: false },
    { uri: "en-US-GuyNeural",      name: "Guy（美音男声）",      lang: "en-US", zh: false },
    { uri: "en-US-JennyNeural",    name: "Jenny（美音女声）",    lang: "en-US", zh: false },
    { uri: "en-US-MichelleNeural", name: "Michelle（美音女声）", lang: "en-US", zh: false },
    { uri: "en-US-AnaNeural",      name: "Ana（美音童声）",      lang: "en-US", zh: false },
    { uri: "en-GB-SoniaNeural",    name: "Sonia（英音女声）",    lang: "en-GB", zh: false },
    { uri: "en-GB-RyanNeural",     name: "Ryan（英音男声）",     lang: "en-GB", zh: false },
    { uri: "en-AU-NatashaNeural",  name: "Natasha（澳音女声）",  lang: "en-AU", zh: false }
  ];

  function isSupported() {
    return ("WebSocket" in window) && window.crypto && window.crypto.subtle &&
           ("TextEncoder" in window) && ("Audio" in window);
  }

  function getVoices() { return VOICES.slice(); }

  function uuid() {
    if (window.crypto && crypto.randomUUID) {
      return crypto.randomUUID().replace(/-/g, "");
    }
    var s = "";
    for (var i = 0; i < 32; i++) {
      s += Math.floor(Math.random() * 16).toString(16);
    }
    return s;
  }

  /* Sec-MS-GEC：sha256(floor(ticks) + TRUSTED_CLIENT_TOKEN)，5 分钟窗口 */
  function genSecMsGec() {
    var t = Date.now() / 1000;
    t += WIN_EPOCH;
    t -= t % 300;
    t *= 1e7;
    var s = String(Math.floor(t)) + TRUSTED_CLIENT_TOKEN;
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)).then(function (buf) {
      var hex = "";
      var bytes = new Uint8Array(buf);
      for (var i = 0; i < bytes.length; i++) {
        hex += ("0" + bytes[i].toString(16)).slice(-2);
      }
      return hex.toUpperCase();
    });
  }

  function escapeXml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }

  /* 播放收集到的 MP3 分片（新朗读会替换正在播放的旧音频，避免叠加） */
  var currentAudio = null;
  function playMp3(parts, onEnd) {
    var done = false;
    function finish() {
      if (done) { return; }
      done = true;
      if (currentAudio === a) { currentAudio = null; }
      if (typeof onEnd === "function") { try { onEnd(); } catch (e) {} }
    }
    var a;
    try {
      if (currentAudio) {
        try { currentAudio.pause(); currentAudio.src = ""; } catch (e) {}
        currentAudio = null;
      }
      var blob = new Blob(parts, { type: "audio/mpeg" });
      var url = URL.createObjectURL(blob);
      a = new Audio(url);
      currentAudio = a;
      a.onended = finish;
      a.onerror = finish;
      var p = a.play();
      if (p && typeof p.catch === "function") {
        p.catch(function () { finish(); }); // 自动播放策略阻止时静默结束
      }
    } catch (e) { finish(); }
  }

  /* 核心：连接 wss → 发送 config + ssml → 收集音频 → 播放 */
  function speakCore(text, voice, ratePct, onEnd, onFail) {
    var finished = false;
    var ws = null;
    var timer = setTimeout(function () { closeUp(); onFail(); }, TIMEOUT);
    function closeUp() {
      if (ws) { try { ws.close(); } catch (e) {} }
    }
    function once(cb) { return function () { if (!finished) { finished = true; clearTimeout(timer); closeUp(); cb(); } }; }

    genSecMsGec().then(function (gec) {
      var url = WSS_BASE +
        "?TrustedClientToken=" + TRUSTED_CLIENT_TOKEN +
        "&Sec-MS-GEC=" + gec +
        "&Sec-MS-GEC-Version=" + SEC_MS_GEC_VERSION +
        "&ConnectionId=" + uuid();
      try { ws = new WebSocket(url); } catch (e) { onFail(); return; }
      var parts = [];

      ws.onopen = function () {
        try {
          var cfg = JSON.stringify({ context: { synthesis: { audio: {
            metadataoptions: { sentenceBoundaryEnabled: false, wordBoundaryEnabled: false },
            outputFormat: "audio-24khz-48kbitrate-mono-mp3"
          } } } });
          ws.send("X-Timestamp:" + new Date().toString() + "\r\n" +
            "Content-Type:application/json; charset=utf-8\r\n" +
            "Path:speech.config\r\n\r\n" + cfg);
          var ssml = "<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='" +
            (String(voice).indexOf("en-") === 0 ? "en-US" : "zh-CN") + "'>" +
            "<voice name='" + voice + "'>" +
            "<prosody pitch='+0Hz' rate='" + ratePct + "' volume='+0%'>" +
            escapeXml(text) + "</prosody></voice></speak>";
          ws.send("X-RequestId:" + uuid() + "\r\n" +
            "Content-Type:application/ssml+xml\r\n" +
            "X-Timestamp:" + new Date().toString() + "Z\r\n" +
            "Path:ssml\r\n\r\n" + ssml);
        } catch (e) { onFail(); }
      };

      ws.onmessage = function (ev) {
        if (typeof ev.data === "string") {
          if (ev.data.indexOf("turn.end") !== -1) {
            once(function () { playMp3(parts, onEnd); })();
          }
          return;
        }
        var buf = new Uint8Array(ev.data);
        var sep = "Path:audio\r\n";
        var idx = -1;
        for (var i = 0; i < buf.length - sep.length; i++) {
          var ok = true;
          for (var j = 0; j < sep.length; j++) {
            if (buf[i + j] !== sep.charCodeAt(j)) { ok = false; break; }
          }
          if (ok) { idx = i + sep.length; break; }
        }
        if (idx !== -1) { parts.push(buf.slice(idx)); }
      };

      ws.onerror = function () { onFail(); };
      ws.onclose = function () { /* 正常结束已在 turn.end 处理 */ };
    }).catch(function () { onFail(); });
  }

  /* 对外朗读接口（单段文本） */
  function speak(text, opts) {
    opts = opts || {};
    text = String(text || "");
    if (!text.trim()) {
      if (typeof opts.onEnd === "function") { setTimeout(opts.onEnd, 0); }
      return;
    }
    var voice = opts.voice || "zh-CN-XiaoxiaoNeural";
    var rate = (typeof opts.rate === "number" && isFinite(opts.rate)) ? opts.rate : 1;
    var ratePct = Math.max(-50, Math.min(50, Math.round((rate - 1) * 100))) + "%";
    var onEnd = (typeof opts.onEnd === "function") ? opts.onEnd : null;
    var onFail = onEnd ? onEnd : function () {};
    speakCore(text, voice, ratePct, onEnd, onFail);
  }

  window.OnlineVoice = {
    isSupported: isSupported,
    getVoices: getVoices,
    speak: speak
  };
})();
