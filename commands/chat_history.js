/*CMD
  command: chat_history
  help:
  need_reply: false
  folder: AI CHAT
  aliases:
CMD*/

var history = User.getProperty("t7_chat_history", []);
if (!Array.isArray(history) || history.length === 0) {
  Bot.sendInlineKeyboard(
    [[{title:"💬 Start Chat",command:"ai_chat"}],[{title:"🏠 Main Menu",command:"/start"}]],
    "📜 *CHAT HISTORY*\n━━━━━━━━━━━━━━\n\nNo messages in the current chat yet."
  );
  return;
}

var text = "📜 *CHAT HISTORY*\n━━━━━━━━━━━━━━\n\n";
var start = Math.max(0, history.length - 10);

for (var i = start; i < history.length; i++) {
  var item = history[i];
  if (!item || !item.content) continue;
  var label = item.role === "user" ? "👤 You" : "🤖 AI";
  var msg = String(item.content);
  if (msg.length > 500) msg = msg.substring(0, 500) + "…";
  text += "*" + label + ":*\n" + msg + "\n\n";
}

if (text.length > 3800) text = text.substring(0, 3800) + "\n…";

Bot.sendInlineKeyboard(
  [
    [{title:"💬 Continue Chat",command:"ai_chat"},{title:"🆕 New Chat",command:"new_chat"}],
    [{title:"🏠 Main Menu",command:"/start"}]
  ],
  text
);
