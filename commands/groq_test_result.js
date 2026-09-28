/*CMD
  command: groq_test_result
  help:
  need_reply: false
  folder: AI TEST
  aliases:
CMD*/

var data;
try{
  data=JSON.parse(content);
}catch(e){
  Bot.sendMessage("❌ *GROQ RESPONSE PARSE ERROR*");
  Bot.run({command:"groq_test_message",options:{waitForAnswer:true}});
  return;
}

if(!data||!data.choices||!data.choices[0]||!data.choices[0].message){
  Bot.sendMessage("❌ *GROQ RESPONSE ERROR*");
  Bot.run({command:"groq_test_message",options:{waitForAnswer:true}});
  return;
}

var reply=String(data.choices[0].message.content||"").trim();
if(!reply) reply="No response.";

var count=parseInt(User.getProperty("t7_groq_test_success")||0)+1;
User.setProperty("t7_groq_test_success",count,"integer");
User.setProperty("t7_groq_last_model",String(data.model||"openai/gpt-oss-120b"),"string");

Bot.sendMessage(
  "✅ *GROQ TEST #"+count+"*\n━━━━━━━━━━━━━━\n\n"+reply
);

Bot.run({command:"groq_test_message",options:{waitForAnswer:true}});
