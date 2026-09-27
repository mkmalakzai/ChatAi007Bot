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
    model: "nvidia/nemotron-3-ultra-550b-a55b:free",
    messages: [
      {
        role: "system",
        content: "You are a helpful, clear and friendly AI assistant. Always reply in the same language as the latest user message unless explicitly asked for another language. English must receive English. Pashto must receive Pashto. Never switch to Korean, Chinese, Japanese, or another language unless requested."
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
