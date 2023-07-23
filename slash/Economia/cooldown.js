 const { MessageEmbed } = require('discord.js');
const firebase = require('firebase');
let database = firebase.database();
const ms = require('ms')

module.exports = {
    name: "cooldown",
    description: "💸 | Veja seus cooldowns!",

    run: async(interaction, client) => { 

    const user = interaction.user;

	let tempo_esgotado_daily = 84000000 ;
	let tempo_esgotado_coleta = 84000000;

	let no = client.emojis.cache.find(emoji => emoji.name === "nocheck"); 
	let est = client.emojis.cache.find(emoji => emoji.name === "estrela");


    const embed_err = new MessageEmbed()
    .setColor('BLUE')
    .setDescription(`${est} | **${interaction.user}**` + '```- Você não se registrou no meu banco de dados tente usar o comando /register```')

	const embed_1 = new MessageEmbed()
	.setColor("BLUE")
	.setDescription(`⏰ | Cooldowns de ${interaction.user}\n ( 📆 ) **/daily**\n╰ ( ✅ ) Disponível\n\n`)
	.setThumbnail('https://media.discordapp.net/attachments/993979883166371941/996798241242873916/relogio.png')

	const embed_2 = new MessageEmbed()
	.setColor("BLUE")
	.setDescription(`⏰ | Cooldowns de ${interaction.user}\n ( 📆 ) **/daily**\n╰ ( ❌ ) Indisponivel\n\n`)
	.setThumbnail('https://media.discordapp.net/attachments/993979883166371941/996798241242873916/relogio.png')

		database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).once("value").then(async function(db){
            if(db.val() === null){
                return interaction.reply({ embeds: [embed_err]})
            }

			if(db.val().author !== null && tempo_esgotado_daily - (Date.now() - db.val().author) <= 0){
				return interaction.reply({ embeds: [embed_1] })
			} 
			if(tempo_esgotado_daily - (Date.now() - db.val().author) > 0){					
				return interaction.reply({ embeds: [embed_2] })
			} 
		})
	}
}