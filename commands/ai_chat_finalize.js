/*CMD
  command: ai_chat_finalize
  help:
  need_reply: false
  folder: AI CHAT
  aliases:
CMD*/

var reply=String(User.getProperty("t7_long_answer")||"").trim();
if(!reply){
  User.setProperty("t7_pending_charge_type","","string");
  User.setProperty("t7_pending_charge_amount",0,"integer");
  Bot.sendMessage("❌ *AI RESPONSE ERROR*\n\nPlease try again.");
  Bot.run({command:"ai_chat_message",options:{waitForAnswer:true}});
  return;
}

var prompt=String(User.getProperty("t7_pending_prompt")||"");
var history=User.getProperty("t7_chat_history",[]);
if(!Array.isArray(history)) history=[];
if(prompt) history.push({role:"user",content:prompt});
history.push({role:"assistant",content:reply});
if(history.length>20) history=history.slice(history.length-20);
User.setProperty("t7_chat_history",history,"json");

// Save explicit user facts/preferences.
if(prompt){
  var low=prompt.toLowerCase();
  var remember=low.indexOf("remember")>=0||low.indexOf("my name is")>=0||
    low.indexOf("i like")>=0||low.indexOf("i love")>=0||
    low.indexOf("زما نوم")>=0||low.indexOf("یاد")>=0;
  if(remember){
    var memory=User.getProperty("t7_memory_facts",[]);
    if(!Array.isArray(memory)) memory=[];
    var fact=prompt;
    if(fact.length>300) fact=fact.substring(0,300);
    if(memory.indexOf(fact)===-1) memory.push(fact);
    if(memory.length>8) memory=memory.slice(memory.length-8);
    User.setProperty("t7_memory_facts",memory,"json");
  }
}

var chargeType=User.getProperty("t7_pending_charge_type")||"";
var chargeAmount=parseInt(User.getProperty("t7_pending_charge_amount")||0);
if(chargeType==="free"){
  var freeUsed=parseInt(User.getProperty("t7_free_used")||0);
  User.setProperty("t7_free_used",freeUsed+1,"integer");
}else if(chargeType==="credit"&&chargeAmount>0){
  var credits=parseInt(User.getProperty("t7_credits")||0);
  User.setProperty("t7_credits",Math.max(0,credits-chargeAmount),"integer");
  var spent=parseInt(User.getProperty("t7_total_credits_spent")||0);
  User.setProperty("t7_total_credits_spent",spent+chargeAmount,"integer");
}

User.setProperty("t7_pending_charge_type","","string");
User.setProperty("t7_pending_charge_amount",0,"integer");
User.setProperty("t7_pending_prompt","","string");
User.setProperty("t7_long_answer","","string");
User.setProperty("t7_continue_count",0,"integer");

var successCount=parseInt(User.getProperty("t7_ai_successes")||0);
User.setProperty("t7_ai_successes",successCount+1,"integer");

var aiName=Bot.getProperty("t7_ai_name")||"AI Assistant";
var max=3500;
if(reply.length<=max){
  Bot.sendMessage("🤖 *"+aiName+"*\n━━━━━━━━━━━━━━\n\n"+reply);
}else{
  Bot.sendMessage("🤖 *"+aiName+"*\n━━━━━━━━━━━━━━");
  for(var i=0;i<reply.length;i+=max) Bot.sendMessage(reply.substring(i,i+max));
}

Bot.run({command:"ai_chat_message",options:{waitForAnswer:true}});
