const {Collection, Client, Discord, MessageCollector} = require('discord.js')
const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons')
const fs = require('fs')
const ms = require('ms')
const client = new Client()
const DisTube = require('distube');
client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
client.queue = new Map()
const chalk = require('chalk')

const config = require('./config.json')
const prefix = config.prefix
const token = config.token
require('discord-buttons')(client)
client.config = config;
client.commands = new Collection(); 
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

fs.readdir(__dirname + "/events/api/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let event = require(__dirname + "/events/api/" + file);
        let eventName = file.split(".")[0];
        console.log(
            chalk.blue.bold("Loading api event ") + chalk.magenta.bold(`"${eventName}"`)
        );
        client.on(eventName, event.bind(null, client));
    });
});
////////////////////////////////////////////////
/// CONST HANDLER

const funcmd = new MessageEmbed()
.setTitle('Fun Commands')
.setImage('https://cdn.discordapp.com/attachments/904624531539382294/905038165302210600/350kb.gif')
.addFields({
  name: 'Fun',
  value: '`poke` | `say` | `smart` | `dadjoke` | `decode`',
})

const infocmd = new MessageEmbed()
.setTitle('Info Commands')
.setImage('https://cdn.discordapp.com/attachments/904624531539382294/905038165302210600/350kb.gif')
.addFields({
  name: 'Information',
  value: '`help` | `invite` | `ping` | `servers` | `uptime`'
})

const imagescmd = new MessageEmbed()
.setTitle('Images Commands')
.setImage('https://cdn.discordapp.com/attachments/904624531539382294/905038165302210600/350kb.gif')
.addFields({
  name: 'Images',
  value: '`approved` | `avatar` | `cat` | `gay`',
})

const gamescmd = new MessageEmbed()
.setTitle('Games Commands')
.setImage('https://cdn.discordapp.com/attachments/904624531539382294/905038165302210600/350kb.gif')
.addFields({
  name: 'Games',
  value: '`8ball`' 
})

const musiccmd = new MessageEmbed()
.setTitle('Music Commands')
.setImage('https://cdn.discordapp.com/attachments/904624531539382294/905038165302210600/350kb.gif')
.addFields({
  name: 'Music',
  value: 'Music Commands is on development'}) 

const fun2x = new MessageButton()
    .setStyle('red')
    .setLabel('Fun')
    .setID('fun')
    .setDisabled(false)

    const info2x = new MessageButton()
    .setStyle('red')
    .setLabel('Information')
    .setID('info')
    .setDisabled(false)

    const images2x = new MessageButton()
    .setStyle('red')
    .setLabel('Images')
    .setID('images')
    .setDisabled(false)

    const games2x = new MessageButton()
    .setStyle('red')
    .setLabel('Games')
    .setID('games')
    .setDisabled(false)

    const supportserver2x = new MessageButton()
    .setStyle('url')
    .setLabel('Support Server')
    .setURL('https://discord.gg/EGdbUSbpsE')

    const music2x = new MessageButton()
    .setStyle('red')
    .setLabel('Music')
    .setID('music')
    .setDisabled(false)

    const back2x = new MessageButton()
    .setStyle('grey')
    .setLabel('Back')
    .setID('back')
    .setDisabled(false)

    const next2x = new MessageButton()
    .setStyle('grey')
    .setLabel('Next')
    .setID('next')

const buttons2x = 'fun2x, info2x, images2x, games2x'
////////////////////////////////////////////////
// CLICKABLE BUTTON HANDLER
client.on('clickButton', async (button) => {
  if (button.id === 'smart') {
    await button.reply.defer()
    button.channel.send(`${button.clicker.user.tag} is smart`)
  }
  if (button.id === 'dumb') {
    await button.reply.defer()
    button.channel.send(`${button.clicker.user.tag} is dumb`)
  }
  if (button.id === 'duration') {
    await button.reply.defer()
  }
  if (button.id === 'fun') {
    await button.reply.defer()
    button.message.edit({
      embed: funcmd,
      buttons: [fun2x, games2x, images2x, next2x, supportserver2x],
    }).then
    await button.message.delete
  }
  if (button.id === 'info') {
    await button.reply.defer()
    button.message.edit({
      embed: infocmd,
      buttons: [music2x, info2x, back2x, supportserver2x],
    })
  }
  if (button.id === 'images') {
    await button.reply.defer()
    button.message.edit({
      embed: imagescmd,
      buttons: [fun2x, games2x, images2x, next2x,supportserver2x],
    })
  }
  if (button.id === 'games') {
    await button.reply.defer()
    button.message.edit({
      embed: gamescmd,
      buttons: [fun2x, games2x, images2x, next2x, supportserver2x],
    })
  }

  if (button.id === 'music') {
    await button.reply.defer()
    button.message.edit({
      embed: musiccmd,
      buttons: [music2x, info2x, back2x, supportserver2x],
    })
  }

  if (button.id === 'next') {
    await button.reply.defer()
    button.message.edit({
      embed: musiccmd,
      buttons: [music2x, info2x, back2x, supportserver2x],
    })
  }

  if (button.id === 'back') {
    await button.reply.defer()
    button.message.edit({
      embed: funcmd,
      buttons: [fun2x, games2x, images2x,next2x,supportserver2x],
    })
  }
})
////////////////////////////////////////////////
// READY EVENT
client.on('ready', () => {
   client.user.setActivity(`${prefix}help`)
   console.log(`${client.user.username} Successfully Logged in!`)
})
//////////////////////////////////////////////////

/////////////////////////////////////////////////
// MESSAGE EVENT
client.on('message', async message => {
     
     const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
     if (message.content.match(prefixMention)) {
     return message.channel.send(`Hii! <@${message.author.id}>, My prefix is \`${prefix}\``);
  }
     if(message.author.bot || message.channel.type === "dm") return;
     if (!message.content.startsWith(prefix)) return;
     if (!message.guild) return;
     if (!message.member) message.member = await message.guild.fetchMember(message);
     const args = message.content.slice(prefix.length).trim().split(/ +/g);
     const cmd = args.shift().toLowerCase();
     if (cmd.length == 0) return;
     let command = client.commands.get(cmd)
     if (!command) command = client.commands.get(client.aliases.get(cmd));
     if (command) command.run(client, message, args)
   })
///////////////////////////////////////////////
client.login(token)
