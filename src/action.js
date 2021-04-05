const core = require ('@actions/core')
const github= require('@actions/github')
const discord= require ('.../src/discord.js')
const fetch= require('node-fetch')


async function run(){
try{

  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
  const payload= github.context.payload   //action,comment,issue, pull_request
    
  console.log(`Received payload ${JSON.stringify(payload, null, 2)}`)
  
  /**
   on merge: commits (github.context.payload.commits)
   on review:  

   on pull- comment: pull_request
   on issue comment: comment
   
   **/ 
  

/** for comments on issue */
  const comment =payload.comment;
  console.log(`"Comment reciived "${JSON.stringify(comment)}`);
  const body= comment.body;
  const user= comment.user.login;
  const issueTopic= payload.issue.title;
  const link= payload.issue.html_url;

  console.log("Body "+body);
  console.log("user "+user);
  console.log("issueTopic "+issueTopic);
  console.log("link "+link);

  const DISCORD_ID = core.getInput('DISCORD_WEBHOOK_ID')
  const DISCORD_TOKEN = core.getInput('DISCORD_WEBHOOK_TOKEN')

    //analysis
discord.send(DISCORD_ID,DISCORD_TOKEN, user, body, issueTopic, link).catch(e=> core.setFailed(e.message));


/** EXTRA: push and PR activity   
  const commits = payload.commits // for commits
  console.log(`"Commit reciived "${JSON.stringify(commits)}`);
  const repository= payload.repository.full_name // annsudo/discord-comments
  const size =  commits.lengts
  const branch = payload.ref.split('/')[payload.ref.split('/').length -1]

 EXTRA: on review --> solutions comment still wil be published to discord  
   const pull_request =payload.pull_request;
  console.log(`"Pull request ?comment reciived "${JSON.stringify(pull_request)}`); 


*/   
 


  const client= github.getOctokit(GITHUB_TOKEN);
  let { owner, repo } = github.context.repo;


//   await client.issues.createComment({
//     owner,
//     repo,
//     issue_number: number,
//    // body
//    body: `${changeMsg}\n\n<img src="${gifUrl}" alt = "almost there" />`
// });




} catch (e){
    core.error(e);
    core.setFailed(e.message);
}
};

run();