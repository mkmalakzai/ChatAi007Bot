/*CMD
  command: groq_test
  help: Test Groq AI connection
  need_reply: false
  folder: AI TEST
  aliases:
CMD*/

var apiKey=Bot.getProperty("groq_api_key");
if(!apiKey){
  Bot.sendMessage("❌ *GROQ API KEY NOT SET*\n\nPrivate Bot Property: `groq_api_key`");
  return;
}

Bot.sendMessage(
  "🧪 *GROQ TEST MODE*\n━━━━━━━━━━━━━━\n\n" +
  "Model: `openai/gpt-oss-120b`\n\n" +
  "Send English, Pashto, or a longer question.\n" +
  "This test does not affect your main AI chat."
);

Bot.run({command:"groq_test_message",options:{waitForAnswer:true}});
