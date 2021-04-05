const discord= require('discord')
const MAX_SIZE = 30; //TODO: check

module.exports.send =(DISCORD_ID,DISCORD_TOKEN, user, body, issueTopic, link)=> new Promise ((success,fail) => {
    var discordChannel
    console.log ("Constructing message ..")
   
//connecting to discord channel by using id and token
    try{
        discordChannel= new discord.WebhookClient(DISCORD_ID,DISCORD_TOKEN)
    } catch(e){
        fail(error.message)
        return
    }

// sending messahe
    discordChannel.send(createMsg(user, body, issueTopic, link)).then(()=>{
        console.log ("Message is send!")
        success()
    }, fail)
})


function createMsg(user, body, issueTopic, link){

//TODO: add timestamp--> .setTimestamp(Date.parse(message.timestamp))
  console.log ("Making message pretty..")
 
 var message= new discord.RichEmbedded().setColor(0x00BB22)
 .setTittle("New comment on "+ issueTopic)
 .setDescription(getBody(user,body))
.setFooter("Read whole discussion on "+ shortLink(link))

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