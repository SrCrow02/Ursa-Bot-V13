const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'gado',
    description: '🚀 | Medir o quanto você é gado!',
    options: [
        {
            name: "user",
            description: "O usuario que deseja pegar o avatar",
            type: 6,
        }
    ],
    run: async(interaction) => {
        const user = interaction.options.getUser('user') || interaction.user;

        let gado = Math.floor(Math.random() * 101) + 1;

        const embed = new MessageEmbed()
        .setTitle('🐂 | Teste de gado')
        .setColor('BLUE')
        .setDescription(`${user}, Você é \`${gado}%\` gado(a)`)
        .setFooter('Muuuuu')

        return interaction.reply({embeds: [embed]})
    }
}