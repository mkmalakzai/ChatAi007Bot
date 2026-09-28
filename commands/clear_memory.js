/*CMD
  command: clear_memory
  help:
  need_reply: false
  folder: AI CHAT
  aliases:
CMD*/

User.setProperty("t7_memory_facts",[],"json");
Bot.sendInlineKeyboard(
  [[{title:"🏠 Main Menu",command:"/start"}]],
  "🧠 *MEMORY CLEARED*\n\nSaved AI memory has been removed."
);
