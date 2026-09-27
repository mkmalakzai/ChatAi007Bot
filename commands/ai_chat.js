/*CMD
  command: ai_chat
  help:
  need_reply: false
  folder: AI CHAT
  aliases:
CMD*/

if (!Bot.getProperty("openrouter_api_key")) {
  Bot.sendMessage("⚠️ *AI IS NOT CONFIGURED*\n\nOpenRouter API key is missing.");
  return;
}

Bot.sendMessage(
  "💬 *AI CHAT*\n━━━━━━━━━━━━━━\n\n" +
  "Send me any question or message.\n\n" +
  "Use /start anytime to return to the menu."
);

Bot.run({
  command: "ai_chat_message",
  options: { waitForAnswer: true }
});
