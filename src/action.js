const core = require ('@actions/core')
const github= require('@actions/github')
const discord= require ('./discord.js')

/**
 *  This action let you track github comments for pull requests 
 *  and issues directly in on chosen discord channel
 */
async function run(){

  const DISCORD_ID = core.getInput('DISCORD_WEBHOOK_ID');
  const DISCORD_TOKEN = core.getInput('DISCORD_WEBHOOK_TOKEN');
    
  const payload= github.context.payload; 
  const comment =payload.comment;
  const body= comment.body;
  const user= comment.user.login;
  const issueTopic= payload.issue.title;
  const link= payload.issue.html_url;

/** Debugging
 * 
console.log(`Received payload ${JSON.stringify(payload)}`);
console.log(`"Comment reciived "${JSON.stringify(comment)}`);
console.log("Body "+body);
console.log("user "+user);
console.log("issueTopic "+issueTopic);
console.log("link "+link);
*/ 

/** Handeling comunication with discord */
discord.send(DISCORD_ID,DISCORD_TOKEN, user, body, issueTopic, link).catch(e=> core.setFailed(e.message));

}

try{ 
    run()
} catch (err){
    core.setFailed(e.message)
}

