/*
  command: ai_test_error
  help:
  need_reply: false
  folder: AI
CMD*/

/* =========================================================
   TPL-007 — AI CHATBOT
   COMMAND: ai_test_error
   ========================================================= */

Bot.sendMessage(
  "❌ <b>OPENROUTER REQUEST FAILED</b>\n\n" +
  "<code>" + String(content).substring(0, 1000) + "</code>",
  { parse_mode: "HTML" }
);