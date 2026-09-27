/*CMD
  command: credits
  help:
  need_reply: false
  folder: MONETIZATION
  aliases:
CMD*/

var credits=parseInt(User.getProperty("t7_credits")||0);
var freeLimit=parseInt(Bot.getProperty("t7_daily_free_limit")||5);
var freeUsed=parseInt(User.getProperty("t7_free_used")||0);
var windowStart=parseInt(User.getProperty("t7_free_window_start")||0);
var now=new Date().getTime();

if (!windowStart || (now-windowStart)>=86400000) {
  freeUsed=0;
}

var freeLeft=Math.max(0,freeLimit-freeUsed);
var price=parseInt(Bot.getProperty("t7_message_credit_price")||1);
var spent=parseInt(User.getProperty("t7_total_credits_spent")||0);

Bot.sendInlineKeyboard(
  [
    [{title:"💬 AI Chat",command:"ai_chat"},{title:"📊 Usage",command:"usage"}],
    [{title:"🏠 Main Menu",command:"/start"}]
  ],
  "💰 *MY CREDITS*\n━━━━━━━━━━━━━━\n\n" +
  "Balance: *" + credits + " credits*\n" +
  "Free messages left: *" + freeLeft + "/" + freeLimit + "*\n" +
  "AI message cost: *" + price + " credit(s)*\n" +
  "Total credits spent: *" + spent + "*"
);
