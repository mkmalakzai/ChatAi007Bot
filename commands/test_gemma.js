/*CMD
  command: test_gemma
  help: Test Gemma multilingual AI
  need_reply: false
  folder: AI TEST
  aliases:
CMD*/

if (!Bot.getProperty("openrouter_api_key")) {
  Bot.sendMessage("⚠️ *OPENROUTER API KEY NOT SET*");
  return;
}

Bot.sendMessage(
  "🧪 *GEMMA LANGUAGE TEST*\n━━━━━━━━━━━━━━\n\n" +
  "Send English or Pashto text."
);

Bot.run({
  command:"test_gemma_message",
  options:{waitForAnswer:true}
});
