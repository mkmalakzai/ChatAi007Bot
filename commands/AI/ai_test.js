/*
  command: ai_test
  help:
  need_reply: false
  folder: AI
CMD*/

/* =========================================================
   TPL-007 — AI CHATBOT
   COMMAND: ai_test
   PURPOSE: Test OpenRouter connection
   ========================================================= */

var apiKey = Bot.getProperty("openrouter_api_key");

if (!apiKey) {
  Bot.sendMessage(
    "❌ <b>OPENROUTER API KEY NOT SET</b>\n\n" +
    "Save your OpenRouter key in this bot property:\n" +
    "<code>openrouter_api_key</code>",
    { parse_mode: "HTML" }
  );
  return;
}

Bot.sendMessage(
  "⏳ <b>Testing AI connection...</b>",
  { parse_mode: "HTML" }
);

HTTP.post({
  url: "https://openrouter.ai/api/v1/chat/completions",
  headers: {
    "Authorization": "Bearer " + apiKey,
    "Content-Type": "application/json"
  },
  body: {
    model: "openrouter/free",
    messages: [
      {
        role: "user",
        content: "Reply with exactly: BOTBOX AI CONNECTED"
      }
    ]
  },
  success: "ai_test_result",
  error: "ai_test_error"
});