/*CMD
  command: new_chat
  help:
  need_reply: false
  folder: AI CHAT
  aliases:
CMD*/

User.setProperty("t7_chat_history", [], "json");
User.setProperty("t7_pending_prompt", "", "string");

Bot.sendMessage("🆕 *NEW CHAT STARTED*\n\nConversation memory has been cleared.");

Bot.runCommand("ai_chat");
