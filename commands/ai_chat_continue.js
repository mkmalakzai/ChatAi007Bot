/*CMD
  command: ai_chat_continue
  help:
  need_reply: false
  folder: AI CHAT
  aliases:
CMD*/

var apiKey=Bot.getProperty("t7_ai_api_key")||Bot.getProperty("groq_api_key");
var endpoint=Bot.getProperty("t7_ai_endpoint")||"https://api.groq.com/openai/v1/chat/completions";
var model=Bot.getProperty("t7_ai_model")||"openai/gpt-oss-120b";
var prompt=String(User.getProperty("t7_pending_prompt")||"");
var answer=String(User.getProperty("t7_long_answer")||"");
var count=parseInt(User.getProperty("t7_continue_count")||0);

if(!apiKey||!prompt||!answer||count>=2){
  Bot.runCommand("ai_chat_finalize");
  return;
}

var tail=answer;
if(tail.length>3500) tail=tail.substring(tail.length-3500);

HTTP.post({
  url:endpoint,
  headers:{
    "Authorization":"Bearer "+apiKey,
    "Content-Type":"application/json"
  },
  body:{
    model:model,
    max_completion_tokens:650,
    messages:[
      {
        role:"system",
        content:"Continue the assistant answer exactly where it stopped. Do not restart, repeat, summarize, add a new introduction, or mention that this is a continuation. Reply in the same language and formatting style."
      },
      {role:"user",content:prompt},
      {role:"assistant",content:tail},
      {role:"user",content:"Continue exactly where you stopped."}
    ]
  },
  success:"ai_chat_continue_result",
  error:"ai_chat_continue_error"
});
