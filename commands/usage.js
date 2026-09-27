/*CMD
  command: usage
  help:
  need_reply: false
  folder: MONETIZATION
  aliases:
CMD*/

var total=parseInt(User.getProperty("t7_total_requests")||0);
var success=parseInt(User.getProperty("t7_ai_successes")||0);
var failed=parseInt(User.getProperty("t7_ai_failures")||0);
var freeUsed=parseInt(User.getProperty("t7_free_used")||0);
var spent=parseInt(User.getProperty("t7_total_credits_spent")||0);
var model=User.getProperty("t7_last_used_model")||"None yet";

Bot.sendInlineKeyboard(
  [
    [{title:"💰 Credits",command:"credits"},{title:"💬 AI Chat",command:"ai_chat"}],
    [{title:"🏠 Main Menu",command:"/start"}]
  ],
  "📊 *AI USAGE*\n━━━━━━━━━━━━━━\n\n" +
  "Requests sent: *" + total + "*\n" +
  "Successful: *" + success + "*\n" +
  "Failed: *" + failed + "*\n" +
  "Free messages used: *" + freeUsed + "*\n" +
  "Credits spent: *" + spent + "*\n\n" +
  "Last model: `" + model + "`"
);
