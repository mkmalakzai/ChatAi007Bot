/*CMD
  command: ai_chat_message
  help:
  need_reply: true
  folder: AI CHAT
  aliases:
CMD*/

var apiKey = Bot.getProperty("openrouter_api_key");

if (!apiKey) {
  Bot.sendMessage("⚠️ *AI IS NOT CONFIGURED*");
  return;
}

var prompt = String(message || "").trim();

if (!prompt) {
  Bot.sendMessage("❌ Please send a text message.");
  Bot.run({command:"ai_chat_message",options:{waitForAnswer:true}});
  return;
}

User.setProperty("t7_last_prompt", prompt, "string");

Bot.sendMessage("🤖 _Thinking..._");

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
        role: "system",
        content: "You are a helpful, clear and friendly AI assistant. Answer in the same language as the user unless they ask otherwise."
      },
      {
        role: "user",
        content: prompt
      }
    ]
  },
  success: "ai_chat_result",
  error: "ai_chat_error"
});
