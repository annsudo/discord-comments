const core = require ('@actions/core')
const github= require('@actions/github')
const fetch= require('node-fetch')

async function run(){
try{

  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
  const payload= github.context.payload   //action,comment,issue, pull_request
  console.log("payload " + payload);
  
  const repository= payload.repository.full_name
  console.log("repository " + repository);
  console.log(`Received payload ${JSON.stringify(payload, null, 2)}`)
  
  const comment =payload.comment;
  console.log("comment " + comment);  

  const commits = payload.commits // for commits
  console.log("commits " + commits);
  console.log(`"Commit reciived "${commits.length}`);
  
  
  const size =  commits.lengts
  console.log("size " + size);
  
  const branch = payload.ref.split('/')[payload.ref.split('/').length -1]
  console.log("branch " + branch);  


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