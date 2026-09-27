/*CMD
  command: test_gemma_message
  help:
  need_reply: true
  folder: AI TEST
  aliases:
CMD*/

var apiKey = Bot.getProperty("openrouter_api_key");
var prompt = String(message || "").trim();

if (!prompt) {
  Bot.sendMessage("❌ Send a text message.");
  Bot.run({command:"test_gemma_message",options:{waitForAnswer:true}});
  return;
}

User.setProperty("t7_gemma_test_prompt", prompt, "string");

Bot.sendMessage("🧪 _Testing Gemma..._");

HTTP.post({
  url:"https://openrouter.ai/api/v1/chat/completions",
  headers:{
    "Authorization":"Bearer " + apiKey,
    "Content-Type":"application/json"
  },
  body:{
    model:"google/gemma-4-31b-it:free",
    messages:[
      {
        role:"system",
        content:"You are a multilingual assistant. Reply naturally in the same language as the user's message. If the message is Pashto, reply in Pashto. If it is English, reply in English."
      },
      {
        role:"user",
        content:prompt
      }
    ]
  },
  success:"test_gemma_result",
  error:"test_gemma_error"
});
