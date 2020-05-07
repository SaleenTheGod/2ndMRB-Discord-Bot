/*
*
* Author: James Ambrose
* Purpose: 2ndMRB Bot to help out the J1 Shop and Provide a good experience for the Milsim community
*
*/

'use strict';

// ------------------------------ ** FUNCTION/METHOD DEFENITIONS ** ------------------------------


// ------------------------------ 
// Rewriting the "console.log" method to do stout to 'debug.log'

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/2ndmrb-bot-logs/2ndmrbbot.log', {flags : 'w'});
var checkin_json_file = fs.createWriteStream(__dirname + 'checkin.log', {flags : 'w'});
var log_stdout = process.stdout;

console.checkin = function(d) { //
  checkin_json_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
}

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

// ------------------------------ 
// This JavaScript function always returns a random number between min and max (both included):

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// ------------------------------ ** END FUNCTION/METHOD DEFENITIONS ** ------------------------------

// ------------------------------ ** CONSTANT DEFENITIONS ** ------------------------------
// Set constants for use within bot functions

const config2ndMRB = require("./config-2ndmrb.json");
const welcomeMessage = `Please contact a recruiter (<@&${config2ndMRB.recruiterGroupID}>) and be ready in the Recruitment Office channel!\n\nYou can get their attention by typing "**!recruiters**" In any text channel in our discord\n\nYou can see a full list of commands by typing "**!help**"`;
const helpMsg = "```\n!help: displays this message\n\n!commands: displays this message\n\n!info: Displays 2nd MRB Server information\n\n!recruiters: Grabs recruiter attention by @-ing them (J-1 Personal Staff)\n\n!orbat: Gives the unit ORBAT link\n\n!modpack: Displays the modpack link\n\n!sop: Links the unit Standards of Procedure documentation\n\n!av | !avatar @USER: Displays user's avatar```"
const infoMsg = "```\nArma Server: arma.2ndmrb.info\n\nTeamspeak Server: teamspeak.2ndmrb.info\n\nWebsite: https://2ndmrb.info```";
const orbatMsg = "https://docs.google.com/spreadsheets/d/1wAzb-syIXvx4a583H-92WLNLzHk7qEil9objc0lhSEU/edit?usp=sharing";
const modpackMsg = `**Modpack:** https://steamcommunity.com/sharedfiles/filedetails/?id=1938803696`;
const sopMsg = `**SOP:** https://docs.google.com/document/d/1M-p8wHoz0FBMTZt5SH58TppE_3B8RnKvCE8EuEpQNMc/edit?usp=sharing`;


// ------------------------------------------------------------------

// Initialize the discord bot/client

const Discord = require('discord.js');
const bot = new Discord.Client();

// ------------------------------------------------------------------

// Checks to see if bot token is at least semi valid.

if (config2ndMRB.botAPIToken.length === 0) {
	console.log('remember to insert your token into 2ndmrb.js :)');
	process.exit();
}

// Attempts to login to the discord server using the token provided in the constants section

try
{
    bot.login(config2ndMRB.botAPIToken);
    console.log("2nd MRB Bot logging in...");
    console.debug("Logged in with token: " + config2ndMRB.botAPIToken);
}
catch
{
    console.log("Discord bot could not login. Please check the API Token");
}

bot.on('ready', () => {
    console.log('2nd MRB Bot Successfully logged in.');
    const fs = require('fs')
    const filePath = 'checkin.json'
    const fd = fs.openSync(filePath, 'w')
  });

// ------------------------------------------------------------------

// Sends a message to the "reception" channel (ID above) when someone joins the server. This is to make them feel welcome

bot.on('guildMemberAdd', member => {
    
    // Gets the channel object from the specified channel ID
    const welcome_channel = bot.channels.cache.get(config2ndMRB.welcomeChannelID);
    
    // Returns the function if the channel is not valid/null 
    if (!welcome_channel) return;

    // Attempts to send the message(s)
    try
    {
        welcome_channel.send(`Welcome to the server, ${member}!` + "\n" + welcomeMessage);
    } catch
    {
        console.log("Cannot find channel name: ", welcomeChannelName);
    }
  });

bot.on('guildMemberRemove', member => {

    // Gets the channel object from the specified channel ID
    const leave_channel = bot.channels.cache.get(config2ndMRB.leaveChannelID);
    
    // Returns the function if the channel is not valid/null 
    if (!leave_channel) return;
   
    // Attempts to send the message(s)
    try
    {
        leave_channel.send(`${member} has left the server. <@&${config2ndMRB.personalGroupID}> <@&${config2ndMRB.recruiterGroupID}>`);
    } catch
    {
        console.log("Cannot find channel name:", leaveChannelName)
    }
  });
  
bot.on('messageReactionAdd', (reaction, user) => {
    let message = reaction.message, emoji = reaction.emoji;
    if (emoji.name == '✅' && message.channel.id == config2ndMRB.checkChannelID) 
    {
        //console.debug("✅ reaction logged in channel id: " + message.channel.id)
        //console.debug(reaction.users)
        //console.debug(JSON.stringify(reaction.users["cache"]))
        let user_reaction_json = (JSON.stringify(reaction.users["cache"])).substring(1, (JSON.stringify(reaction.users["cache"])).length-1)
        user_reaction_json = JSON.parse(user_reaction_json);
        console.log("User: " + user_reaction_json.username +  " ID: " + user_reaction_json.id + " has reacted to the unit check in. Logging...")
        console.debug(user_reaction_json)
        console.checkin(user_reaction_json.username);

        // fs.readFile('checkin.json', 'utf8', function readFileCallback(err, data){
        //     if (err){
        //         console.log(err);
        //     } else {
        //     console.log("1")
        //     let obj = (JSON.stringify(reaction.users["cache"])).substring(1, (JSON.stringify(reaction.users["cache"])).length-1); //now it an object
        //     console.log(obj)
        //     obj.table.push(obj.id); //add some data
        //     console.log("3")
        //     let tempjson = JSON.stringify(obj); //convert it back to json
        //     console.log("4")
        //     fs.writeFile('checkin.json.json', tempjson, 'utf8', callback); // write it back 
        // }});
    }
});


bot.on('message', (message) => {
    // Ignores the bots own messages so it doesn't parse itself
    if (message.author.bot) return;

    // Sanitize user input to make it all lowercase
    let messageContent = message.content.toLowerCase();
    
    // Splits the Discord message into an array of strings using " " as a delimiter.
    let messagesplit = messageContent.split(" ");

    switch(messagesplit[0])
    {
        case "!commands":
        case "!help":  
            console.log("2nd MRB Message Found: " + messagesplit[0]);
            message.reply(helpMsg);
            break;
        case "!checkin":
            const checkInChannel = bot.channels.cache.get(config2ndMRB.checkChannelID);
            console.debug("checkInChannelID: " + config2ndMRB.checkChannelID)
            console.debug("checkInChannel: " + checkInChannel)
            console.debug(config2ndMRB.bofa)
            checkInChannel.send("@everyone```\n\nAll members of the 2nd MRB must check-in once during the 2-Week period. Simply react to this message with the '✅' Emoji```")
                .then(message.react('✅'));
            break;
        case "!info":
            console.log("2nd MRB Message Found: " + messagesplit[0]);
            message.reply(infoMsg);
            break;
        case "!orbat":
            console.log("2nd MRB Message Found: " + messagesplit[0]);
            message.reply(orbatMsg);
            break;
        case "!modpack":
            console.log("2nd MRB Message Found: " + messagesplit[0]);
            message.reply(modpackMsg);
            break;
        case "!recruiters":
            console.log("2nd MRB Message Found: " + messagesplit[0]);
            console.log("Sending message to: " + config2ndMRB.personalGroupID);
            message.channel.send(`<@&${config2ndMRB.recruiterGroupID}> is on the way!`);
            break;
        case "!sop":
            console.log("2nd MRB Message Found: " + messagesplit[0])
            message.reply(sopMsg);
            break;
        case "!av":
        case "!avatar":
            console.log("2nd MRB Message Found: " + messagesplit[0])
            const user = message.mentions.users.first();
            if (user) {
                message.reply(user.displayAvatarURL());
            }
            else
            {
                message.reply(message.author.displayAvatarURL());
            }
            break;
        case "!debug":
            console.log(JSON.stringify(config2ndMRB));
            break;

    }

    if ((message.channel.id == config2ndMRB.banterChannelID)) {
        let banterRandom = getRndInteger(1,100);
        console.log("Banter chat detected: " + banterRandom);
        if (banterRandom == 1)
        {   
            message.react('🇸').then(() => message.react('🇨')).then(() => message.react('🇭')).then(() => message.react('🇲')).then(() => message.react('🇪')).then(() => message.react('🇦')).then(() => message.react('🇹'))
			    .catch(() => console.error('One of the emojis failed to react.'));
        }
        if (banterRandom == 50)
        {
            message.react('🇸').then(() => message.react('🇮')).then(() => message.react('🇲')).then(() => message.react('🇵'))
                .catch(() => console.error('One of the emojis failed to react.'));
        }
        if (banterRandom == 100)
        {
            message.react('🆗').then(() => message.react('🇿')).then(() => message.react('🇴')).then(() => message.react('🅾️')).then(() => message.react('🇲')).then(() => message.react('🇪')).then(() => message.react('🇷'))
                .catch(() => console.error('One of the emojis failed to react.'));
        }

    }
});