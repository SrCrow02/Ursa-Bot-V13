const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

module.exports = {
	name: 'botinfo',
	description: '🧠 | Ver informaçoes do bot',
    
    timeout: 5000,
	run: async(interaction, client) => {

	const user = interaction.options.getUser('user') || interaction.user;

	//Emojis
    const crasha = client.emojis.cache.find(emoji => emoji.name === "crasha");
    const chave = client.emojis.cache.find(emoji => emoji.name === "manutencao");
    const link = client.emojis.cache.find(emoji => emoji.name === "link");
    const lapis = client.emojis.cache.find(emoji => emoji.name === "lapis");
    const bot = client.emojis.cache.find(emoji => emoji.name === "bot");
    const setadireita = client.emojis.cache.find(emoji => emoji.name === "setadireita");
    const ping = client.emojis.cache.find(emoji => emoji.name === "ping");
    
	const embed = new MessageEmbed()
    .setColor('#00BFFF')
    .setDescription(`Olá ${interaction.user}, Abaixo está uma listinha sobre mim:\n\n` + ` Informações
     ${ping} | Ping: **${Math.round(client.ws.ping)}ms**
     ${lapis} | Estou em **${client.guilds.cache.size} servidores**
     | Discord.js: **V13.2.0**
     ${crasha} | Meu ID: **785567076302979113**
     ${setadireita} | Prefixo nesse server:** Sou uma bot em slash [/]**
     ${bot} | Versão do bot: **1.0.0**
     ${chave} | Dev:` +  '``crow_ler``' + `\n${link} | [Meu site](https://ursabott.000webhostapp.com/)`)
     .setThumbnail('https://media.discordapp.net/attachments/993979883166371941/996798240865390713/bot.png')
     .setImage("https://share.creavite.co/39VRSehSa0GyXtYh.gif")

    interaction.reply({ embeds: [embed] })

    }
}
