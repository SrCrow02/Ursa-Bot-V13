const Discord = require("discord.js");
const { Client, Intents } = require('discord.js');
const firebase = require('firebase')

const config = require('./config.json');
const token = config.token;

global.client = new Client({ intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_INVITES,
	Intents.FLAGS.GUILD_BANS,
	Intents.FLAGS.GUILD_INVITES,
	Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
	Intents.FLAGS.GUILD_VOICE_STATES,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS
]});

client.on('messageCreate', message =>{

  const embed_mencao = new Discord.MessageEmbed()
  .setTitle("Ursa Bot")
  .setColor("BLUE")
  .setDescription(`Olá ${message.author} tudo bem? Eu sou uma simples bot em Slash **[/]**, Meu criado se chama **crow_ler** Para ver meus comandos use **/help**`)
  .setImage("https://share.creavite.co/39VRSehSa0GyXtYh.gif")

  if(message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`){
    return message.channel.send({embeds: [embed_mencao]})
  }
})

//Conexão com a pasta da DB
const database = require("./database/database")

const fs = require("fs");
const { readdirSync } = require('fs');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const path = require('path');
require('colors');

client.commands = new Discord.Collection();
client.slash = new Discord.Collection();
client.aliases = new Discord.Collection();

const commands = []
readdirSync("./slash/").map(async dir => {
	readdirSync(`./slash/${dir}/`).map(async (cmd) => {
	commands.push(require(path.join(__dirname, `./slash/${dir}/${cmd}`)))
    })
})
const rest = new REST({ version: "9" }).setToken(token);

(async () => {
	try {
		console.log('Comecei a atualizar os comandos!'.yellow);
		await rest.put(
			Routes.applicationCommands(config.botID),
			{ body: commands },
		);
		console.log('Atualizei todos os comandos slash!'.green);
	} catch (error) {
		console.error(error);
	}
})();

["events", "slash"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

/*client.on("guildCreate", guild => {
    database.ref(`Servidores/guild/${guild.íd}`).once("value").then(async function(db){
        database.ref(`Servidores/guild/${guild.id}`).update({
            bemvindo: false,
            saida: false,
            chatentrada: false,
            chatsaida: false
        });
    })  
})

client.on("guildMemberAdd", guild => {
  database.ref(`Servidores/guild/${guild.íd}`).once("value").then(async function(db){

    let ata = "1074318458034061384";


      
  }) 
})*/
  
client.login(config.token);