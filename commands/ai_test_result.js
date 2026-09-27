/*CMD
  command: ai_test_result
  help:
  need_reply: false
  folder: AI
  aliases:
CMD*/

var data;
try {
  data = JSON.parse(content);
} catch (e) {
  Bot.sendMessage("❌ *INVALID API RESPONSE*\n\n" + String(content).substring(0, 900));
  return;
}

if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
  Bot.sendMessage("❌ *AI CONNECTION FAILED*\n\n" + JSON.stringify(data).substring(0, 1000));
  return;
}

var reply = data.choices[0].message.content || "No text returned.";
Bot.sendMessage("✅ *OPENROUTER CONNECTED*\n\n🤖 *AI Reply:*\n" + reply);
