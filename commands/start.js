/*CMD
  command: /start
  help:
  need_reply: false
  folder: CORE
  aliases:
CMD*/

var uid = String(user.telegramid);
var users = Bot.getProperty("t7_users", []);

if (users.indexOf(uid) === -1) {
  users.push(uid);
  Bot.setProperty("t7_users", users, "json");
}

Bot.sendInlineKeyboard(
  [
    [{title:"💬 AI Chat",command:"ai_chat"}],
    [{title:"🆕 New Chat",command:"new_chat"}]
  ],
  "🤖 *AI CHATBOT*\n━━━━━━━━━━━━━━\n\n" +
  "Your personal AI assistant.\n\n" +
  "Ask questions, write content, study, code and more."
);
