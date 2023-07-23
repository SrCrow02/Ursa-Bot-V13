const { MessageEmbed } = require('discord.js');
const firebase = require('firebase');
let database = firebase.database();

module.exports = {
    name: "register",
    description: "🧠 | Se registre na minha DB",
    timeout: 5000,
    run: async(interaction, client) => {

        const user = interaction.options.getUser('user') || interaction.user;

        //Emojis
        let no = client.emojis.cache.find(emoji => emoji.name === "nocheck"); 
        let est = client.emojis.cache.find(emoji => emoji.name === "estrela");


        const embed_register = new MessageEmbed()
        .setColor('BLUE')
        .setDescription(`${est} | **${user}**` + '```- Você foi registrado no meu banco de dados!!!```')

        const embed_fail = new MessageEmbed()
        .setColor('RED')
        .setDescription(`${no} | **${user}**` + '```- Você já foi cadastrado no meu banco de dados```')

        database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).once("value").then(async function(dbz){
                if(db.val() === null){
                    let db = await database.ref(`Servidores/Economia/Mel/${user.id}`).once('value')

                    database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).set({
                        coins: 0,
                        author: 0,
                    })


                    return interaction.reply({ embeds: [embed_register] })
                } else {
                    return interaction.reply({ embeds: [embed_fail] })
            }
        })
    }
}