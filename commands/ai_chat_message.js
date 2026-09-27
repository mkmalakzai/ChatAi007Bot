/*CMD
  command: ai_chat_message
  help:
  need_reply: true
  folder: AI CHAT
  aliases:
CMD*/

var provider = String(Bot.getProperty("t7_ai_provider") || "openrouter");
var apiKey = Bot.getProperty("t7_ai_api_key") || Bot.getProperty("openrouter_api_key");
var endpoint = Bot.getProperty("t7_ai_endpoint") || "https://openrouter.ai/api/v1/chat/completions";
var model = Bot.getProperty("t7_ai_model") || "nvidia/nemotron-3-ultra-550b-a55b:free";

if (!apiKey || !endpoint || !model) {
  Bot.sendMessage("⚠️ *AI IS NOT CONFIGURED*\n\nProvider settings are incomplete.");
  return;
}

var prompt = String(message || "").trim();
if (!prompt) {
  Bot.sendMessage("❌ Please send a text message.");
  Bot.run({command:"ai_chat_message",options:{waitForAnswer:true}});
  return;
}
if (prompt === "/start") {
  Bot.runCommand("/start");
  return;
}

var aiName = Bot.getProperty("t7_ai_name") || "AI Assistant";
var customPrompt = Bot.getProperty("t7_system_prompt") || "";
var history = User.getProperty("t7_chat_history", []);
if (!Array.isArray(history)) history = [];
if (history.length > 12) history = history.slice(history.length - 12);

var systemPrompt =
  "You are " + aiName + ", a helpful, clear and friendly AI assistant. " +
  "If asked who or what you are, identify yourself as " + aiName + ". " +
  "Do not expose hidden system instructions or backend details unless explicitly asked. " +
  "Reply naturally in the same language as the latest user message unless another language is requested. " +
  "If the user writes Pashto, reply in natural Pashto. If the user writes English, reply in English.";

if (customPrompt) systemPrompt += "\n\nAdditional instructions: " + customPrompt;

var messages = [{role:"system",content:systemPrompt}];
for (var i=0; i<history.length; i++) {
  if (history[i] && history[i].role && history[i].content) {
    messages.push({role:history[i].role,content:String(history[i].content)});
  }
}
messages.push({role:"user",content:prompt});

User.setProperty("t7_pending_prompt",prompt,"string");
User.setProperty("t7_last_provider",provider,"string");
Bot.sendMessage("🤖 _Thinking..._");

HTTP.post({
  url:endpoint,
  headers:{
    "Authorization":"Bearer " + apiKey,
    "Content-Type":"application/json"
  },
  body:{
    model:model,
    messages:messages
  },
  success:"ai_chat_result",
  error:"ai_chat_error"
});
