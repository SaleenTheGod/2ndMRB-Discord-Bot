const Discord = require('discord.js');
const bot = new Discord.Client();
var giphy = require('giphy-api')('jb85gNp1WGUXiR58jTcNhFklaWLSZvag');

let recruiterGroupID = "656369822719803421"
let botAPIToken = "" //API Token here

if (botAPIToken.length === 0) {
	console.log('remember to insert your token into 2ndmrb.js :)')
	process.exit()
}


let welcomeChannelName = "reception"
let welcomeMessage = `Please contact a recruiter (<@&${recruiterGroupID}>) and be ready in the Recruitment Office channel!\n\n\nYou can get their attention by typing "**!recruiters**" In any text channel in our discord\n\n\nYou can see a full list of commands by typing "**!help**"`
bot.login(botAPIToken);

console.log("2nd MRB Bot Initiated")

bot.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'general');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    try
    {
        channel.send(`Welcome to the server, ${member}.\n`, welcomeMessage);
    } catch
    {
        console.log("Cannot find channel name:", welcomeChannelName)
    }
  });
  

bot.on('message', (message) => {
    // Ignores the bots own messages so it doesn't parse itself
    if (message.author.bot) return;
    
    // Sanitize user input to make it all lowercase
    let messageContent = message.content.toLowerCase();
    // Splits the Discord message into an array of strings using " " as a delimiter.
    let messagesplit = messageContent.split(" ");

    
    

    if (messagesplit[0] === "!commands" || messagesplit[0] === "!help") {
        console.log("2nd MRB Message Found: ", messagesplit[0])
        let helpMsg = "```\n!help: displays this message\n\n!commands: displays this message\n\n!info: Displays 2nd MRB Server information\n\n!recruiters: Grabs recruiter attention by @-ing them (J-1 Personal Staff)\n\n!orbat: Gives the unit ORBAT link\n\n!modpack: Displays the modpack link```";
        message.reply(helpMsg);
    }

    if (messagesplit[0] === "!info") {
        console.log("2nd MRB Message Found: ", messagesplit[0])
        let infoMsg = "```\nArma Server: arma.2ndmrb.info\n\nTeamspeak Server: teamspeak.2ndmrb.info\n\nWebsite: https://2ndmrb.info```";
        message.reply(infoMsg);
    }

    if (messagesplit[0] === "!orbat") {
        console.log("2nd MRB Message Found: ", messagesplit[0])
        let orbatMsg = "https://docs.google.com/spreadsheets/d/1wAzb-syIXvx4a583H-92WLNLzHk7qEil9objc0lhSEU/edit?usp=sharing";
        message.reply(orbatMsg);
    }

    if (messagesplit[0] === "!modpack") {
        console.log("2nd MRB Message Found: ", messagesplit[0])
        let modpackMsg = `**Modpack:** https://steamcommunity.com/sharedfiles/filedetails/?id=1938803696`;
        message.reply(modpackMsg);
    }

    if (messagesplit[0] === "!recruiters") {
        console.log("2nd MRB Message Found: ", messagesplit[0])
        console.log("Sending message to: ", recruiterGroupID)
        message.channel.send(`<@&${recruiterGroupID}> is on the way!`);
    }

    if (messagesplit[0] === "!debug") {
        console.log("2nd MRB Debug Message Found: ", messagesplit[0])
        message.reply("version: 1.1.0; Added Giphy support");
        message.reply(welcomeMessage);
    }

    if (messagesplit[0] === "!giphy") {
        console.log("2nd MRB Debug Message Found: ", messagesplit[0])
        giphy.random({
            tag: messagesplit[1],
            fmt: 'json'
        }, function (err, res) {
            // Res contains gif data!
            try {
                console.debug(res);
                message.channel.send(res.data.image_url);
            }
            catch
            {
                console.error(err)
                console.log(err)
            }
        });
        
    }
});