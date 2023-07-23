const Discord = require('discord.js');
const superagent = require(`superagent`)

module.exports = {
    name: "beijar",
    description: "🤗 | Beijar um membro",
    options: [
        {
            name: "user",
            description: "O usuario que deseja beijar",
            type: 6,
            required: true,
        }
    ],
    timeout: 5000,
    run: async(interaction, client) => {
            superagent.get(`https://nekos.life/api/v2/img/kiss`).end((err, response) => {
                superagent.get(`https://nekos.life/api/v2/img/slap`).end((er, respons) => {

            const author = interaction.user;
            let member = interaction.options.getUser('user');

            let avatar = author.avatarURL({ dynamic: true, format: "png", size: 1024 });

            if(member.id == "966087520469286962"){
                const embed = new Discord.MessageEmbed()
                .setTitle('Tapa')
                .setDescription(`***${member} Deu um Tapa em ${author}***`)
                .setImage(respons.body.url)
                .setColor('RED')
                .setThumbnail(avatar)

                interaction.reply({ embeds: [embed] })   
            }

            const embed = new Discord.MessageEmbed()
            .setTitle('Beijo')
            .setDescription(`***${author} Deu um beijo em ${member}***`)
            .setImage(response.body.url)
            .setColor('BLUE')
            .setThumbnail(avatar)

            interaction.reply({ embeds: [embed] })

        })
    })
    }
}