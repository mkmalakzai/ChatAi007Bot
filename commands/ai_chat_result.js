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

var reply = data.choices[0].message.content || "No response.";

Bot.sendMessage("🤖 *AI*\n━━━━━━━━━━━━━━\n\n" + reply);

Bot.run({
  command: "ai_chat_message",
  options: { waitForAnswer: true }
});
