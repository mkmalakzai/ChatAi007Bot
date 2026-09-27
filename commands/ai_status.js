/*CMD
  command: ai_status
  help:
  need_reply: false
  folder: AI CHAT
  aliases:
CMD*/

var provider=String(Bot.getProperty("t7_ai_provider")||"openrouter");
var endpoint=Bot.getProperty("t7_ai_endpoint")||"https://openrouter.ai/api/v1/chat/completions";
var model=Bot.getProperty("t7_ai_model")||"nvidia/nemotron-3-ultra-550b-a55b:free";
var hasKey=!!(Bot.getProperty("t7_ai_api_key")||Bot.getProperty("openrouter_api_key"));
var used=User.getProperty("t7_last_used_model")||"No successful request yet";
var ok=parseInt(User.getProperty("t7_ai_successes")||0);
var fail=parseInt(User.getProperty("t7_ai_failures")||0);

Bot.sendMessage(
  "🧠 *AI ENGINE STATUS*\n━━━━━━━━━━━━━━\n\n" +
  "Provider: *" + provider + "*\n" +
  "API Key: *" + (hasKey?"Configured ✅":"Missing ❌") + "*\n" +
  "Model: `" + model + "`\n" +
  "Endpoint: `" + endpoint + "`\n\n" +
  "Last model used: `" + used + "`\n" +
  "Successful: *" + ok + "*\n" +
  "Failed: *" + fail + "*"
);
