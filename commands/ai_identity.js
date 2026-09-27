/*CMD
  command: ai_identity
  help:
  need_reply: false
  folder: AI CHAT
  aliases:
CMD*/

var aiName = Bot.getProperty("t7_ai_name") || "AI Assistant";
var model = Bot.getProperty("t7_ai_model") || "nvidia/nemotron-3-ultra-550b-a55b:free";

Bot.sendMessage(
  "🤖 *AI IDENTITY*\n━━━━━━━━━━━━━━\n\n" +
  "Name: *" + aiName + "*\n" +
  "Model: `" + model + "`\n\n" +
  "The public assistant identity is separate from the underlying AI provider."
);
