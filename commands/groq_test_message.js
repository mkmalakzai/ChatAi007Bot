/*CMD
  command: groq_test_message
  help:
  need_reply: true
  folder: AI TEST
  aliases:
CMD*/

var apiKey=Bot.getProperty("groq_api_key");
if(!apiKey){
  Bot.sendMessage("❌ Groq API key is missing.");
  return;
}

var prompt=String(message||"").trim();
if(!prompt){
  Bot.sendMessage("Send a text message.");
  Bot.run({command:"groq_test_message",options:{waitForAnswer:true}});
  return;
}

User.setProperty("t7_groq_test_prompt",prompt,"string");
Bot.sendMessage("⚡ _Groq thinking..._");

HTTP.post({
  url:"https://api.groq.com/openai/v1/chat/completions",
  headers:{
    "Authorization":"Bearer "+apiKey,
    "Content-Type":"application/json"
  },
  body:{
    model:"openai/gpt-oss-120b",
    messages:[
      {
        role:"system",
        content:"You are a helpful multilingual AI assistant. Reply naturally in the same language as the user. If the user writes Pashto, reply in Pashto. Keep answers useful and concise."
      },
      {role:"user",content:prompt}
    ],
    max_completion_tokens:500
  },
  success:"groq_test_result",
  error:"groq_test_error"
});
