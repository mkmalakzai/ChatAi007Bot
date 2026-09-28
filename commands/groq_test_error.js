/*CMD
  command: groq_test_error
  help:
  need_reply: false
  folder: AI TEST
  aliases:
CMD*/

var fails=parseInt(User.getProperty("t7_groq_test_fail")||0)+1;
User.setProperty("t7_groq_test_fail",fails,"integer");

Bot.sendMessage(
  "❌ *GROQ TEST FAILED*\n━━━━━━━━━━━━━━\n\n" +
  "Failure #"+fails+"\n" +
  "Main AI chat was not changed."
);

Bot.run({command:"groq_test_message",options:{waitForAnswer:true}});
