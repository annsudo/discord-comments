const core = require ('@actions/core');
const github= require('@actions/github');
const fetch= require('node-fetch');

async function run(){
try{

  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
  
  const client= github.getOctokit(GITHUB_TOKEN);
  let { owner, repo } = github.context.repo;

console.log("HIIIII my friend again");

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