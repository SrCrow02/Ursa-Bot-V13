const Discord = require('discord.js');
const superagent = require(`superagent`)

module.exports = {
    name: "tapa",
    description: "🤗 | Bater em um usuario",
    options: [
        {
            name: "user",
            description: "O usuario que deseja bater",
            type: 6,
            required: true,
        }
    ],
    timeout: 5000,
    run: async(interaction, client) => {
            superagent.get(`https://nekos.life/api/v2/img/slap`).end((err, response) => {

            const author = interaction.user;
            let member = interaction.options.getUser('user');

            let avatar = author.avatarURL({ dynamic: true, format: "png", size: 1024 });

            if(member.id == "966087520469286962"){
                const embed = new Discord.MessageEmbed()
                .setTitle('Tapa')
                .setDescription(`***Osh, Deixa de ser ousado!!!\n ${member} Deu um tapa em ${author}***`)
                .setImage(response.body.url)
                .setColor('BLUE')
                .setThumbnail(avatar)
    
                return interaction.reply({ embeds: [embed] })
            }

            
            const embed = new Discord.MessageEmbed()
            .setTitle('Tapa')
            .setDescription(`***${author} Deu um tapa em ${member}***`)
            .setImage(response.body.url)
            .setColor('BLUE')
            .setThumbnail(avatar)

            interaction.reply({ embeds: [embed] })

        })
    }
}