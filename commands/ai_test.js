/*CMD
  command: ai_test
  help: Test OpenRouter AI connection
  need_reply: false
  folder: AI
  aliases:
CMD*/

var apiKey = Bot.getProperty("openrouter_api_key");

if (!apiKey) {
  Bot.sendMessage("❌ *OPENROUTER API KEY NOT SET*\n\nSet bot property: openrouter_api_key");
  return;
}

Bot.sendMessage("⏳ *Testing AI connection...*");

HTTP.post({
  url: "https://openrouter.ai/api/v1/chat/completions",
  headers: {
    "Authorization": "Bearer " + apiKey,
    "Content-Type": "application/json"
  },
  body: {
    model: "openrouter/free",
    messages: [{ role: "user", content: "Reply with exactly: BOTBOX AI CONNECTED" }]
  },
  success: "ai_test_result",
  error: "ai_test_error"
});
