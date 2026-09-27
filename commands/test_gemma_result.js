/*CMD
  command: test_gemma_result
  help:
  need_reply: false
  folder: AI TEST
  aliases:
CMD*/

var data;

try {
  data = JSON.parse(content);
} catch (e) {
  Bot.sendMessage("❌ *INVALID GEMMA RESPONSE*");
  return;
}

if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
  Bot.sendMessage(
    "❌ *GEMMA RESPONSE ERROR*\n\n" +
    String(content).substring(0, 1200)
  );
  return;
}

var reply = String(data.choices[0].message.content || "No response.");

Bot.sendMessage(
  "✅ *GEMMA TEST*\n━━━━━━━━━━━━━━\n\n" +
  reply
);

Bot.run({
  command:"test_gemma_message",
  options:{waitForAnswer:true}
});
