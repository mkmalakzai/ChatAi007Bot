/*CMD
  command: ai_chat_result
  help:
  need_reply: false
  folder: AI CHAT
  aliases:
CMD*/

var data;
try {
  data = JSON.parse(content);
} catch (e) {
  Bot.sendMessage("❌ *AI RESPONSE ERROR*\n\nPlease try again.");
  Bot.run({command:"ai_chat_message",options:{waitForAnswer:true}});
  return;
}

if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
  Bot.sendMessage("❌ *AI RESPONSE ERROR*\n\nPlease try again.");
  Bot.run({command:"ai_chat_message",options:{waitForAnswer:true}});
  return;
}

var reply=String(data.choices[0].message.content||"")
  .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,"")
  .replace(/[\uD800-\uDFFF]/g,"")
  .replace(/[\uE000-\uF8FF]/g,"")
  .trim();

if(!reply) reply="No response.";
User.setProperty("t7_long_answer",reply,"string");

var usedModel=String(data.model||"unknown");
User.setProperty("t7_last_used_model",usedModel,"string");

var reason=String(data.choices[0].finish_reason||"");
if(reason==="length"){
  User.setProperty("t7_continue_count",0,"integer");
  Bot.runCommand("ai_chat_continue");
}else{
  Bot.runCommand("ai_chat_finalize");
}
