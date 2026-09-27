/*CMD
  command: ai_chat_error
  help:
  need_reply: false
  folder: AI CHAT
  aliases:
CMD*/

Bot.sendMessage(
  "❌ *AI REQUEST FAILED*\n\n" +
  "Please try again in a moment."
);

Bot.run({
  command: "ai_chat_message",
  options: { waitForAnswer: true }
});
