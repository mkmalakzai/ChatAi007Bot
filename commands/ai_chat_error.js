/*CMD
  command: ai_chat_error
  help:
  need_reply: false
  folder: AI CHAT
  aliases:
CMD*/

User.setProperty("t7_pending_prompt","","string");

var failures=parseInt(User.getProperty("t7_ai_failures")||0);
User.setProperty("t7_ai_failures",failures+1,"integer");

var provider=String(Bot.getProperty("t7_ai_provider")||"openrouter");

Bot.sendInlineKeyboard(
  [
    [{title:"🔄 Try Again",command:"ai_chat"}],
    [{title:"🏠 Main Menu",command:"/start"}]
  ],
  "❌ *AI REQUEST FAILED*\n━━━━━━━━━━━━━━\n\n" +
  "Provider: *" + provider + "*\n" +
  "Your conversation memory is safe.\n\n" +
  "Please try again."
);
