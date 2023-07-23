const Discord = require('discord.js');
const superagent = require(`superagent`)

module.exports = {
    name: "cafuné",
    description: "🤗 | Dê cafuné em um membro",
    options: [
        {
            name: "user",
            description: "O usuario que deseja acariciar",
            type: 6,
            required: true,
        }
    ],
    timeout: 5000,
    run: async(interaction, client) => {
            superagent.get(`https://nekos.life/api/v2/img/pat`).end((err, response) => {

            const author = interaction.user;
            let member = interaction.options.getUser('user');

            let avatar = author.avatarURL({ dynamic: true, format: "png", size: 1024 });

            const embed = new Discord.MessageEmbed()
            .setTitle('Cafuné')
            .setDescription(`***${author} Deu um cafuné em ${member}***`)
            .setImage(response.body.url)
            .setColor('BLUE')
            .setThumbnail(avatar)

            interaction.reply({ embeds: [embed] })

        })
    }
}