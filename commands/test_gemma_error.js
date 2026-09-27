/*CMD
  command: test_gemma_error
  help:
  need_reply: false
  folder: AI TEST
  aliases:
CMD*/

Bot.sendMessage(
  "❌ *GEMMA REQUEST FAILED*\n\n" +
  String(content || "No error details").substring(0, 1200)
);
