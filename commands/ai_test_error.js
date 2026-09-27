/*CMD
  command: ai_test_error
  help:
  need_reply: false
  folder: AI
  aliases:
CMD*/

Bot.sendMessage("❌ *OPENROUTER REQUEST FAILED*\n\n" + String(content).substring(0, 1000));
