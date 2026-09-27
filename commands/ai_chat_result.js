/*CMD
  command: ai_chat_result
  help:
  need_reply: false
  folder: AI CHAT
  aliases:
CMD*/

var data;
try {
  data = JSON.parse(content);
} catch (e) {
  Bot.sendMessage("❌ *AI RESPONSE ERROR*\n\nPlease try again.");
  Bot.run({command:"ai_chat_message",options:{waitForAnswer:true}});
  return;
}

if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
  Bot.sendMessage("❌ *AI RESPONSE ERROR*\n\nPlease try again.");
  Bot.run({command:"ai_chat_message",options:{waitForAnswer:true}});
  return;
}

var reply = String(data.choices[0].message.content || "No response.");
var prompt = User.getProperty("t7_pending_prompt") || "";
var history = User.getProperty("t7_chat_history", []);
if (!Array.isArray(history)) history = [];

if (prompt) history.push({role:"user",content:String(prompt)});
history.push({role:"assistant",content:reply});
if (history.length > 12) history = history.slice(history.length - 12);

User.setProperty("t7_chat_history", history, "json");
User.setProperty("t7_pending_prompt", "", "string");

var aiName = Bot.getProperty("t7_ai_name") || "AI Assistant";
var max = 3500;

if (reply.length <= max) {
  Bot.sendMessage("🤖 *" + aiName + "*\n━━━━━━━━━━━━━━\n\n" + reply);
} else {
  Bot.sendMessage("🤖 *" + aiName + "*\n━━━━━━━━━━━━━━");
  for (var i = 0; i < reply.length; i += max) {
    Bot.sendMessage(reply.substring(i, i + max));
  }
}

Bot.run({command:"ai_chat_message",options:{waitForAnswer:true}});
