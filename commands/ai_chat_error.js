/*CMD
  command: ai_chat_error
  help:
  need_reply: false
  folder: AI CHAT
  aliases:
CMD*/

var pending = User.getProperty("t7_pending_prompt") || "";
User.setProperty("t7_pending_prompt", "", "string");

var failures = parseInt(User.getProperty("t7_ai_failures") || 0);
failures++;
User.setProperty("t7_ai_failures", failures, "integer");

Bot.sendInlineKeyboard(
  [
    [{title:"🔄 Try Again",command:"ai_chat"}],
    [{title:"🏠 Main Menu",command:"/start"}]
  ],
  "❌ *AI TEMPORARILY UNAVAILABLE*\n━━━━━━━━━━━━━━\n\n" +
  "The free AI providers could not complete this request.\n" +
  "Your conversation memory is safe. Please try again."
);
