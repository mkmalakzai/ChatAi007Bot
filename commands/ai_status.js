/*CMD
  command: ai_status
  help:
  need_reply: false
  folder: AI CHAT
  aliases:
CMD*/

var primary = Bot.getProperty("t7_ai_model") || "nvidia/nemotron-3-ultra-550b-a55b:free";
var fallbacks = Bot.getProperty("t7_fallback_models", [
  "nvidia/nemotron-3.5-lightning:free",
  "thinking-machines/inkling:free",
  "openrouter/free"
]);
var used = User.getProperty("t7_last_used_model") || "No successful request yet";
var ok = parseInt(User.getProperty("t7_ai_successes") || 0);
var fail = parseInt(User.getProperty("t7_ai_failures") || 0);

Bot.sendMessage(
  "🧠 *AI ENGINE STATUS*\n━━━━━━━━━━━━━━\n\n" +
  "Primary: `" + primary + "`\n" +
  "Fallbacks: *" + fallbacks.length + "*\n" +
  "Last model used: `" + used + "`\n\n" +
  "Successful: *" + ok + "*\n" +
  "Failed: *" + fail + "*"
);
