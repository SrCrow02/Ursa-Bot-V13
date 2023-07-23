const {ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, MessageEmbed} = require('discord.js');
const superagent = require(`superagent`)

module.exports = {
    name: "abraçar",
    description: "🤗 | Abraçar um membro",
    options: [
        {
            name: "user",
            description: "O usuario que deseja abraçar",
            type: 6,
            required: true,
        }
    ],
    timeout: 5000,
    run: async(interaction, client) => {
            superagent.get(`https://nekos.life/api/v2/img/hug`).end((err, response) => {

            const author = interaction.user;
            let member = interaction.options.getUser('user');
            let avatar = author.avatarURL({ dynamic: true, format: "png", size: 1024 });


            //Depois colocar na config
            if(member.id == "966087520469286962" || member.id == author){
                const embed = new MessageEmbed()
                .setTitle('Abraço')
                .setDescription(`***Own, está carente... toma aqui um abraço\n ${member} Deu um abraço em ${author}***`)
                .setImage(response.body.url)
                .setColor('BLUE')
                .setThumbnail(avatar)
    
                return interaction.reply({ embeds: [embed]})
            } 



            const embed = new MessageEmbed()
            .setTitle('Abraço')
            .setDescription(`***${author} Deu um abraço em ${member}***`)
            .setImage(response.body.url)
            .setColor('BLUE')
            .setThumbnail(avatar)

            interaction.reply({ embeds: [embed] })

        })
    }
}