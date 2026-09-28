/*CMD
  command: memory
  help:
  need_reply: false
  folder: AI CHAT
  aliases:
CMD*/

var memory=User.getProperty("t7_memory_facts",[]);
if(!Array.isArray(memory)) memory=[];

if(!memory.length){
  Bot.sendInlineKeyboard(
    [[{title:"🏠 Main Menu",command:"/start"}]],
    "🧠 *SAVED MEMORY*\n━━━━━━━━━━━━━━\n\nNo saved memory yet.\n\nTell the AI something like: _My name is Malakzai. Remember this._"
  );
  return;
}

var text="🧠 *SAVED MEMORY*\n━━━━━━━━━━━━━━\n\n";
for(var i=0;i<memory.length;i++) text+=(i+1)+". "+memory[i]+"\n";

Bot.sendInlineKeyboard(
  [
    [{title:"🗑 Clear Memory",command:"clear_memory"}],
    [{title:"🏠 Main Menu",command:"/start"}]
  ],
  text
);
