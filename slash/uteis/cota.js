const { MessageEmbed } = require('discord.js');
const request = require("request")

module.exports = {
    name: "cotação",
    description: "🧠 | Veja a cotação para BRL de varias moedas",
	timeout: 5000,
    run: async(interaction, client) => {

		const calendario = client.emojis.cache.find(emoji => emoji.name === "calendario");
		const sacodinheiro = client.emojis.cache.find(emoji => emoji.name === "sacodinheiro");

        const options = {
			
            url: `https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL`,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8'
            }
        }

        const callback = function(err, res, body){
            let json = JSON.parse(body)
			let cotacao = JSON.parse(body).USDBRL['bid']
			let dia = JSON.parse(body).USDBRL['create_date']
			let nome = JSON.parse(body).USDBRL['name']

			let cotacao2 = JSON.parse(body).EURBRL['bid']
			let dia2 = JSON.parse(body).EURBRL['create_date']
			let nome2 = JSON.parse(body).EURBRL['name']

			let cotacao3 = JSON.parse(body).BTCBRL['bid']
			let dia3 = JSON.parse(body).BTCBRL['create_date']
			let nome3 = JSON.parse(body).BTCBRL['name']


				const embed = new MessageEmbed()
				.setTitle(`${sacodinheiro}Cotação das Moedas`)
				.setDescription(`
				**${nome}:**` + "```" + `R$${cotacao}` + "```" + `**${calendario} | Ultima atualização: ${dia}**\n
				**${nome2}:**` + "```" + `R$${cotacao2}` + "```" + `**${calendario} | Ultima atualização: ${dia2}**\n
				**${nome3}:**` + "```" + `R$${cotacao3}` + "```" + `**${calendario} | Ultima atualização: ${dia3}**`)
				.setColor("GOLD")

				return interaction.reply({ embeds: [embed]})

        }

		request(options, callback) 
    }
}