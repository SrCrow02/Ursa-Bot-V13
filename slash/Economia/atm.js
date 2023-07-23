const {ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, MessageEmbed} = require('discord.js');

const firebase = require('firebase'); //Chamando o firebase(banco de dados)
let database = firebase.database(); //A database

//Configuração
module.exports = {
    name: "atm",
    description: "💸 | Veja a carteira",
        options: [
        {
            name: "user",
            description: "O usuario que deseja ver a carteira",
            type: 6,
            required: false
        }
    ],
//Configuração
    timeout: 3000,
    run: async(interaction, client) => {
        //A pessoa que sera mostrada a carteira
        const user =  interaction.user;
        const user_mention = interaction.options.getUser('user');
        

        //Emoji
        let no = client.emojis.cache.find(emoji => emoji.name === "nocheck");
        let est = client.emojis.cache.find(emoji => emoji.name === "estrela");
        //Emoji

        //avatar
        let avatar = user.displayAvatarURL({format: 'png'});

        //Embeds
        let embed_failed = new MessageEmbed()
        .setTitle(`${no} | A Operação foi um fracasso`)
        .setColor('RED')
        .setDescription(`Este usuário não está registrado em meu banco de dados`)
        .setThumbnail('https://media.discordapp.net/attachments/966086686205435917/966474720906194974/bloq_word.png?width=85&height=85')

        const embed_1 = new MessageEmbed()
        .setColor('BLUE')
        .setDescription(`${est} | **${interaction.user}**` + '```- Você não se registrou no meu banco de dados tente usar o comando /register```')

            //Conectando na db
            if(!user_mention){
                database.ref(`Servidores/Economia/Coins/${user.id}`).once("value").then(async function(db){

                            //Se a db do usuario for nula seta ela pra 0
                        if(db.val() === null){
                            return interaction.reply({ embeds: [embed_1] })  
                        } else {
                            let embed_sucess_one = new MessageEmbed()
                            .setColor(`GOLD`)
                            .setDescription(`:money_with_wings: | Money: **R$${db.val().coins}**`)
                            .setThumbnail(`${avatar}`)
                            .setAuthor(user.tag, avatar)  

                            return interaction.reply({ embeds: [embed_sucess_one] }) 
                        }
                    })
                } else  if(user_mention != ''){
                    database.ref(`Servidores/Economia/Coins/${user_mention.id}`).once("value").then(async function(dbz){
                        if(dbz.val() === null){
                            return interaction.reply({ embeds: [embed_failed]})
                        } else {
                            let embed_sucess_two = new MessageEmbed()
                            .setColor(`GOLD`)
                            .setDescription(`:money_with_wings: | Money: **R$${dbz.val().coins}**`)
                            .setThumbnail(`${user_mention.displayAvatarURL({format: 'png'})}`)
                            .setAuthor(user_mention.tag, user_mention.displayAvatarURL({format: 'png'}))  

                            return interaction.reply({ embeds: [embed_sucess_two] })      
                }
            })     
        }
    }
}
