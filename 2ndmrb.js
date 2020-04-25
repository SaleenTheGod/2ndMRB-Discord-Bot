const Discord = require('discord.js');
const bot = new Discord.Client();
var giphy = require('giphy-api')('jb85gNp1WGUXiR58jTcNhFklaWLSZvag');

let personGroupID = "656369822719803421"
let recruiterGroupID = "682778069651554396"
let botAPIToken = "" //API Token here
let welcomeChannelName = "reception"
let leaveChannelName = "water-cooler"
let banterChannelId = "656668182211330068"
let welcomeMessage = `Please contact a recruiter (<@&${recruiterGroupID}>) and be ready in the Recruitment Office channel!\n\n\nYou can get their attention by typing "**!recruiters**" In any text channel in our discord\n\n\nYou can see a full list of commands by typing "**!help**"`

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

if (botAPIToken.length === 0) {
	console.log('remember to insert your token into 2ndmrb.js :)')
	process.exit()
}

bot.login(botAPIToken);

console.log("2nd MRB Bot Initiated")

bot.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(channel => channel.name === welcomeChannelName)
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    try
    {
        channel.send(`Welcome to the server, ${member}!`);
        channel.send(welcomeMessage);
    } catch
    {
        console.log("Cannot find channel name:", welcomeChannelName)
    }
  });

bot.on('guildMemberRemove', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === leaveChannelName);
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    try
    {
        channel.send(`${member} has left the server. <@&${personGroupID}> <@&${recruiterGroupID}>`);
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
        let helpMsg = "```\n!help: displays this message\n\n!commands: displays this message\n\n!info: Displays 2nd MRB Server information\n\n!recruiters: Grabs recruiter attention by @-ing them (J-1 Personal Staff)\n\n!orbat: Gives the unit ORBAT link\n\n!modpack: Displays the modpack link\n\n!sop: Links the unit Standards of Procedure documentation```";
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
        console.log("Sending message to: ", personGroupID)
        message.channel.send(`<@&${recruiterGroupID}> is on the way!`);
    }

    if (messagesplit[0] === "!sop") {
        console.log("2nd MRB Message Found: ", messagesplit[0])
        let sopMsg = `**SOP:** https://docs.google.com/document/d/1M-p8wHoz0FBMTZt5SH58TppE_3B8RnKvCE8EuEpQNMc/edit?usp=sharing`;
        message.reply(sopMsg);
    }
    
    if (messagesplit[0] === "!debug") {
        console.log("2nd MRB Debug Message Found: ", messagesplit[0])
        message.reply("version: 1.1.0");
        message.reply(welcomeMessage);
        console.log(message.author.id)
    }

    if (messagesplit[0] === "!giphy") {
        messageContentRejoined = ""
        for (var i = 1; i < messagesplit.length; i++)
        {
            messageContentRejoined = messageContentRejoined + messagesplit[i] + " "
        }
        console.log("2nd MRB Debug Message Found: ", messagesplit[0], messageContentRejoined, "messageContentRejoined Length: ", messageContentRejoined.length)

        for (var j = 0; i < messagesplit.length; j++)
        {
            console.log(messagesplit[j])
        }
        if (messagesplit.length > 2)
        {
            giphy.search({
                tag: messageContentRejoined,
                fmt: 'json'
            }, function (err, res) {
                // Res contains gif data!
                try {
                    // console.debug(res);
                    message.channel.send(res.data.image_url);
                }
                catch
                {
                    console.error(err)
                    console.log(err)
                }
            });
        }
        else{
            giphy.random({
                tag: messageContentRejoined,
                fmt: 'json'
            }, function (err, res) {
                // Res contains gif data!
                try {
                    // console.debug(res);
                    message.channel.send(res.data.image_url);
                }
                catch
                {
                    console.error(err)
                    console.log(err)
                }
            });
        }
    }
    // END IF

    //let banterchannelObj = member.guild.channels.find(ch => ch.name === banterChannelId);
  //  console.log(banterchannelObj)
  //console.log(message.channel.id)
    if ((message.channel.id == banterChannelId)) {
        
        let rando = (Math.round(Math.random() * 50))
        console.log(rando)
        if (rando == 10)
        {   
            message.react('🇸')
			.then(() => message.react('🇨'))
            .then(() => message.react('🇭'))
            .then(() => message.react('🇲'))
            .then(() => message.react('🇪'))
            .then(() => message.react('🇦'))
            .then(() => message.react('🇹'))
			.catch(() => console.error('One of the emojis failed to react.'));
        }
        if (rando == 8)
        {
            message.react('🇸')
			.then(() => message.react('🇮'))
            .then(() => message.react('🇲'))
            .then(() => message.react('🇵'))
			.catch(() => console.error('One of the emojis failed to react.'));
        }
        if (rando == 6)
        {

            message.react('🆗')
            .then(() => message.react('🇿'))
            .then(() => message.react('🇴'))
            .then(() => message.react('🅾️'))
            .then(() => message.react('🇲'))
            .then(() => message.react('🇪'))
            .then(() => message.react('🇷'))
            .catch(() => console.error('One of the emojis failed to react.'));
        }

    }
});