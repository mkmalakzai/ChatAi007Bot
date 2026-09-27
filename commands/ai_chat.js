/*CMD
  command: ai_chat
  help:
  need_reply: false
  folder: AI CHAT
  aliases:
CMD*/

if (!Bot.getProperty("openrouter_api_key")) {
  Bot.sendMessage("⚠️ *AI IS NOT CONFIGURED*\n\nOpenRouter API key is missing.");
  return;
}

var aiName = Bot.getProperty("t7_ai_name") || "AI Assistant";
var history = User.getProperty("t7_chat_history", []);
var hasHistory = history && history.length > 0;

Bot.sendInlineKeyboard(
  [
    [{title:"🆕 New Chat",command:"new_chat"},{title:"📜 History",command:"chat_history"}],
    [{title:"🏠 Main Menu",command:"/start"}]
  ],
  "💬 *" + aiName.toUpperCase() + "*\n━━━━━━━━━━━━━━\n\n" +
  (hasHistory ? "🧠 Conversation memory is active.\n\n" : "") +
  "Send me any question or message."
);

Bot.run({command:"ai_chat_message",options:{waitForAnswer:true}});
