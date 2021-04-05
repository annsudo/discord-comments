const discord= require('discord.js');
const MAX_SIZE = 30; //Size for the max message length shown in a Discord msg

module.exports.send =(DISCORD_ID, DISCORD_TOKEN, user, body, issueTopic, link)=> new Promise ((success, fail) => {
    var botChannel
    console.log ("Constructing message ..")
   
//connecting to discord channel by using id and token
    try{
        console.log ("Connecting to Discord ..")
        botChannel= new discord.WebhookClient(DISCORD_ID,DISCORD_TOKEN)
    } catch(e){
        fail (error.message)
        return
    }

/** sending message */
 botChannel.send(createMsg(user, body, issueTopic, link))
  .then(()=>{
        console.log ("Message is send!")
        success()
    }, fail);

/** Stoping server */
 botChannel.destroy();   
 
})





function createMsg(user, body, issueTopic, link){

//TODO: add timestamp--> .setTimestamp(Date.parse(message.timestamp))
  console.log ("Making message pretty..")
 
 var message= new discord.MessageEmbed()
 .setColor(0x00BB22)
 .setTitle("🐙Github comment from @"+ user)
 .setDescription(getBody(link,issueTopic))
 .setFooter("💬 "+foterFormat(body))

return message
}


/** Pretty Format for the message */
function getBody(link,issueTopic){

 var prettyMessageBody = ` ${issueTopic} - [\`${"Go to Github"}\`](${link})\n`
 return prettyMessageBody
}

/** Creating footer, only test allowed */
function foterFormat(body){
 var footer= body.length > MAX_SIZE ? body.substring(0, MAX_SIZE) + "..." : body
 
    return footer
}