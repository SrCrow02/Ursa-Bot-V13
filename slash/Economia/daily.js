 const { MessageEmbed } = require('discord.js');
const firebase = require('firebase');
let database = firebase.database();
const ms = require('ms')

module.exports = {
    name: "daily",
    description: "💸 | Coletar dinheiro diario",

    timeout: 2000,
    run: async(interaction, client) => {   

        const user = interaction.user

        let no = client.emojis.cache.find(emoji => emoji.name === "nocheck"); 
        let est = client.emojis.cache.find(emoji => emoji.name === "estrela");

        //Tempo de espera pra cada daily
        let tempo_esgotado = 84000000;

        let amount = Math.floor(Math.random() * 100) + 300;

        database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).once("value").then(async function(db){

        //Embeds
            const embed1 = new MessageEmbed()
            .setColor('BLUE')
            .setDescription(`${est} | **${interaction.user}**` + '```- Você não se registrou no meu banco de dados tente usar o comando /register```')

            const embed2 = new MessageEmbed()
            .setColor('BLUE')
            .setDescription(`${est} | Parabéns ${interaction.user}, Você coletou ||**${amount}**|| Espere 1 dia para pegar o daily novamente.`)
            .setThumbnail('https://media.discordapp.net/attachments/993979883166371941/996798240118812692/presente.png')
        //Embeds 
            if(db.val() === null){
                return interaction.reply({ embeds: [embed1]})
            }

            //Se tempo não for concluido embedErro
            if(db.val().author !== null && tempo_esgotado - (Date.now() - db.val().author) > 0){
                let time = ms(tempo_esgotado - (Date.now() - db.val().author));
                return interaction.reply(`${no} | ${interaction.user},** Desculpe, mas você já recebeu seu dinheiro diário, volte daqui ${time}!**`);
            }

            database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).update({
                coins: amount + db.val().coins,
                author: Date.now()
            });

            interaction.reply({ embeds: [embed2] }) 
        })
    }
}