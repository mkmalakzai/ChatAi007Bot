/*CMD
  command: ai_chat_continue_result
  help:
  need_reply: false
  folder: AI CHAT
  aliases:
CMD*/

var data;
try{data=JSON.parse(content);}catch(e){Bot.runCommand("ai_chat_finalize");return;}

if(!data||!data.choices||!data.choices[0]||!data.choices[0].message){
  Bot.runCommand("ai_chat_finalize");
  return;
}

var part=String(data.choices[0].message.content||"")
  .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,"")
  .replace(/[\uD800-\uDFFF]/g,"")
  .replace(/[\uE000-\uF8FF]/g,"")
  .trim();

var answer=String(User.getProperty("t7_long_answer")||"");
if(part) answer+=(answer?"\n\n":"")+part;
User.setProperty("t7_long_answer",answer,"string");

var count=parseInt(User.getProperty("t7_continue_count")||0)+1;
User.setProperty("t7_continue_count",count,"integer");

var reason=String(data.choices[0].finish_reason||"");
if(reason==="length" && count<2){
  Bot.runCommand("ai_chat_continue");
}else{
  Bot.runCommand("ai_chat_finalize");
}
