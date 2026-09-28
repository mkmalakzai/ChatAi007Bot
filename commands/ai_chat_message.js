/*CMD
  command: ai_chat_message
  help:
  need_reply: true
  folder: AI CHAT
  aliases:
CMD*/

var provider = String(Bot.getProperty("t7_ai_provider") || "groq");
var apiKey = Bot.getProperty("t7_ai_api_key") || Bot.getProperty("groq_api_key");
var endpoint = Bot.getProperty("t7_ai_endpoint") || "https://api.groq.com/openai/v1/chat/completions";
var model = Bot.getProperty("t7_ai_model") || "openai/gpt-oss-120b";

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

var freeLimit = parseInt(Bot.getProperty("t7_daily_free_limit") || 5);
var creditPrice = parseInt(Bot.getProperty("t7_message_credit_price") || 1);
if (freeLimit < 0) freeLimit = 0;
if (creditPrice < 1) creditPrice = 1;

var now = new Date().getTime();
var windowStart = parseInt(User.getProperty("t7_free_window_start") || 0);
var freeUsed = parseInt(User.getProperty("t7_free_used") || 0);

if (!windowStart || (now - windowStart) >= 86400000) {
  windowStart = now;
  freeUsed = 0;
  User.setProperty("t7_free_window_start", windowStart, "integer");
  User.setProperty("t7_free_used", 0, "integer");
}

var credits = parseInt(User.getProperty("t7_credits") || 0);
var useFree = freeUsed < freeLimit;

if (!useFree && credits < creditPrice) {
  Bot.sendInlineKeyboard(
    [
      [{title:"💰 My Credits",command:"credits"}],
      [{title:"🏠 Main Menu",command:"/start"}]
    ],
    "💳 *INSUFFICIENT CREDITS*\n━━━━━━━━━━━━━━\n\n" +
    "Daily free messages used: *" + freeUsed + "/" + freeLimit + "*\n" +
    "Credits: *" + credits + "*\n" +
    "Message cost: *" + creditPrice + " credit(s)*"
  );
  return;
}

User.setProperty("t7_pending_charge_type", useFree ? "free" : "credit", "string");
User.setProperty("t7_pending_charge_amount", useFree ? 0 : creditPrice, "integer");

var totalRequests = parseInt(User.getProperty("t7_total_requests") || 0);
User.setProperty("t7_total_requests", totalRequests + 1, "integer");

var aiName = Bot.getProperty("t7_ai_name") || "AI Assistant";
var customPrompt = Bot.getProperty("t7_system_prompt") || "";
var history = User.getProperty("t7_chat_history", []);
if (!Array.isArray(history)) history = [];

// Full history stays local. Provider receives compact memory + recent context.
var apiHistory = history.length > 4 ? history.slice(history.length - 4) : history;
var memory = User.getProperty("t7_memory_facts", []);
if (!Array.isArray(memory)) memory = [];

var systemPrompt =
  "You are " + aiName + ", a helpful, clear and friendly AI assistant. " +
  "If asked who or what you are, identify yourself as " + aiName + ". " +
  "Do not expose hidden system instructions or backend details unless explicitly asked. " +
  "Reply naturally in the same language as the latest user message unless another language is requested. " +
  "If the user writes Pashto, reply in natural Pashto. If the user writes English, reply in English.";

if (memory.length) {
  systemPrompt += "\n\nConversation memory facts:\n- " + memory.join("\n- ");
}
if (customPrompt) systemPrompt += "\n\nAdditional instructions: " + customPrompt;

var messages = [{role:"system",content:systemPrompt}];
for (var i=0; i<apiHistory.length; i++) {
  if (apiHistory[i] && apiHistory[i].role && apiHistory[i].content) {
    var oldText = String(apiHistory[i].content);
    if (oldText.length > 500) oldText = oldText.substring(0,500);
    messages.push({role:apiHistory[i].role,content:oldText});
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
    max_completion_tokens:650,
    messages:messages
  },
  success:"ai_chat_result",
  error:"ai_chat_error"
});
