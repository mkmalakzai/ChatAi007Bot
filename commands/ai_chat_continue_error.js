/*CMD
  command: ai_chat_continue_error
  help:
  need_reply: false
  folder: AI CHAT
  aliases:
CMD*/

// Keep the successful portion instead of losing the whole answer if a
// continuation request times out.
Bot.runCommand("ai_chat_finalize");
