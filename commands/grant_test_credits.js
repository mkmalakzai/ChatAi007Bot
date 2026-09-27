/*CMD
  command: grant_test_credits
  help:
  need_reply: false
  folder: MONETIZATION
  aliases:
CMD*/

var owner=String(Bot.getProperty("t7_owner")||Bot.getProperty("t7_setup_owner")||"");
if (owner && String(user.telegramid)!==owner) {
  Bot.sendMessage("🔒 Owner only.");
  return;
}

var amount=parseInt(params||10);
if (!amount || amount<1) amount=10;
if (amount>1000) amount=1000;

var credits=parseInt(User.getProperty("t7_credits")||0);
User.setProperty("t7_credits",credits+amount,"integer");

Bot.sendMessage("✅ *TEST CREDITS ADDED*\n\n+"+amount+" credits\nBalance: *"+(credits+amount)+"*");
