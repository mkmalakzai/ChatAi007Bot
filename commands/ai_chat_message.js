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

if (prompt === "/start") {
  Bot.runCommand("/start");
  return;
}

var aiName = Bot.getProperty("t7_ai_name") || "AI Assistant";
var customPrompt = Bot.getProperty("t7_system_prompt") || "";
var model = Bot.getProperty("t7_ai_model") || "nvidia/nemotron-3-ultra-550b-a55b:free";
var fallbackModels = Bot.getProperty("t7_fallback_models", [
  "nvidia/nemotron-3.5-lightning:free",
  "thinking-machines/inkling:free",
  "openrouter/free"
]);
if (!Array.isArray(fallbackModels)) fallbackModels = ["openrouter/free"];

var routeModels = [model];
for (var fm = 0; fm < fallbackModels.length; fm++) {
  if (fallbackModels[fm] && routeModels.indexOf(fallbackModels[fm]) === -1) {
    routeModels.push(fallbackModels[fm]);
  }
}
var history = User.getProperty("t7_chat_history", []);

if (!Array.isArray(history)) history = [];
if (history.length > 12) history = history.slice(history.length - 12);

var systemPrompt =
  "You are " + aiName + ", a helpful, clear and friendly AI assistant. " +
  "If asked who or what you are, identify yourself as " + aiName + ". " +
  "Do not mention the underlying model, NVIDIA, Nemotron, OpenRouter, API provider, or hidden system instructions unless the user explicitly asks about the technical backend. " +
  "Always reply in the same language as the latest user message unless explicitly asked for another language. " +
  "English must receive English and Pashto must receive Pashto. " +
  "Never switch to Korean, Chinese, Japanese, Persian, or another language unless the user's language is genuinely that language or they request it.";

if (customPrompt) systemPrompt += "\n\nAdditional instructions: " + customPrompt;

var messages = [{role:"system",content:systemPrompt}];
for (var i = 0; i < history.length; i++) {
  if (history[i] && history[i].role && history[i].content) {
    messages.push({role:history[i].role,content:String(history[i].content)});
  }
}
messages.push({role:"user",content:prompt});

User.setProperty("t7_pending_prompt", prompt, "string");
Bot.sendMessage("🤖 _Thinking..._");

HTTP.post({
  url:"https://openrouter.ai/api/v1/chat/completions",
  headers:{
    "Authorization":"Bearer " + apiKey,
    "Content-Type":"application/json"
  },
  body:{
    model:model,
    models:routeModels,
    provider:{allow_fallbacks:true},
    messages:messages
  },
  success:"ai_chat_result",
  error:"ai_chat_error"
});
