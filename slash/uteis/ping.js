const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "ping",
    description: "🧠 | Ver velocidade do bot",
    timeout: 5000,
    run: async(interaction, client) => {

        //Emoji
        const ping = client.emojis.cache.find(emoji => emoji.name === "ping");

        await interaction.reply('🏓 Pong!')

        const msg = await interaction.fetchReply()

        const embed = new MessageEmbed()
        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
        .setColor('RANDOM')
        .setTimestamp()
        .setDescription(`${ping} | **API:** ${client.ws.ping}ms.`)
        interaction.editReply({ embeds: [embed], content: `<@${interaction.user.id}>` })
    }
}