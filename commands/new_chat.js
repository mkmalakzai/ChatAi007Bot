/*CMD
  command: new_chat
  help:
  need_reply: false
  folder: AI CHAT
  aliases:
CMD*/

User.setProperty("t7_last_prompt", "", "string");

Bot.sendMessage("🆕 *NEW CHAT STARTED*\n\nPrevious chat context has been cleared.");

Bot.runCommand("ai_chat");
