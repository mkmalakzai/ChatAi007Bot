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

var aiName = Bot.getProperty("t7_ai_name") || "AI Assistant";
var history = User.getProperty("t7_chat_history", []);
var count = history && history.length ? Math.floor(history.length / 2) : 0;

Bot.sendInlineKeyboard(
  [
    [{title:"💬 AI Chat",command:"ai_chat"},{title:"🆕 New Chat",command:"new_chat"}],
    [{title:"📜 Chat History",command:"chat_history"}]
  ],
  "🤖 *" + aiName.toUpperCase() + "*\n━━━━━━━━━━━━━━\n\n" +
  "Your personal AI assistant.\n\n" +
  "💭 Messages in current chat: *" + count + "*\n\n" +
  "Ask questions, write content, study, code and more."
);
