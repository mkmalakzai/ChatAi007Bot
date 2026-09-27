/*
  command: ai_test_result
  help:
  need_reply: false
  folder: AI
CMD*/

/* =========================================================
   TPL-007 — AI CHATBOT
   COMMAND: ai_test_result
   ========================================================= */

var data;

try {
  data = JSON.parse(content);
} catch (e) {
  Bot.sendMessage(
    "❌ <b>INVALID API RESPONSE</b>\n\n" +
    "<code>" + String(content).substring(0, 900) + "</code>",
    { parse_mode: "HTML" }
  );
  return;
}

if (
  !data ||
  !data.choices ||
  !data.choices[0] ||
  !data.choices[0].message
) {
  Bot.sendMessage(
    "❌ <b>AI CONNECTION FAILED</b>\n\n" +
    "<code>" + JSON.stringify(data).substring(0, 1000) + "</code>",
    { parse_mode: "HTML" }
  );
  return;
}

var reply = data.choices[0].message.content || "No text returned.";

Bot.sendMessage(
  "✅ <b>OPENROUTER CONNECTED</b>\n\n" +
  "🤖 <b>AI Reply:</b>\n" +
  reply,
  { parse_mode: "HTML" }
);