const discord= require('discord.js')
const MAX_SIZE = 30; //TODO: check

module.exports.send =(DISCORD_ID,DISCORD_TOKEN, user, body, issueTopic, link)=> new Promise ((resolve, reject) => {
    var client
    console.log ("Constructing message ..")
   
//connecting to discord channel by using id and token
    try{
        client= new discord.WebhookClient(DISCORD_ID,DISCORD_TOKEN)
    } catch(e){
        reject (error.message)
        return
    }

// sending messahe
    client.send(createMsg(user, body, issueTopic, link)).then(()=>{
        console.log ("Message is send!")
        resolve()
    }, reject)
})


function createMsg(user, body, issueTopic, link){

//TODO: add timestamp--> .setTimestamp(Date.parse(message.timestamp))
  console.log ("Making message pretty..")
 
 var message= new discord.RichEmbedded().setColor(0x00BB22)
 .setTittle("New comment on "+ issueTopic)
 .setDescription(getBody(user,body))
.setFooter("Read whole discussion on "+ shortLink(link))

return message
}


/** Pretty Format for the message */
function getBody(user,body){

 var msg= body.length > MAX_SIZE ? body.substring(0, MAX_SIZE) + "..." : body
 var prettyMessageBody = `[\`${user}\`] — ${msg} \n`
 //`[\`${sha}\`](${commit.url}) — ${message} \n`
 return prettyMessageBody
}

/** Show only firsl part of the link */
function shortLink(link){
 var linkDiscord= link.length > MAX_SIZE ? link.substring(0, MAX_SIZE) + "..." : link
return linkDiscord
}