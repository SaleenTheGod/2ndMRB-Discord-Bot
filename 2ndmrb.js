const Discord = require('discord.js');
const bot = new Discord.Client();

let recruiterGroupID = "656369822719803421"
let botAPIToken = "API Token Goes Here"
bot.login(botAPIToken);

bot.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'reception');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}.\nPlease contact a recruiter (<@&${recruiterGroupID}>) and be ready in the Recruitment Office channel!\nYou can get their attention by typing "!recruiters" In any text channel in our discord`);
  });
  

bot.on('message', (message) => {
    // Ignores the bots own messages so it doesn't parse itself
    if (message.author.bot) return;
   	
    // Splits the Discord message into an array of strings using " " as a delimiter.
    var messagesplit = message.content.split(" ");

    if (messagesplit[0] === "!debug") {
        console.log("2nd MRB Debug Message Found: ", messagesplit[0])
        message.reply("https://m.imgur.com/r/The_Dennis/0VbZH5G");
    }

    if (messagesplit[0] === "!recruiters") {
        console.log("2nd MRB Message Found: ", messagesplit[0])
        console.log("Sending message to: ", recruiterGroupID)
        message.channel.send(`<@&${recruiterGroupID}> is on the way!`);
    }
});