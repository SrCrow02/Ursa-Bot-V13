module.exports = {
    name: "lock",
    permissions: "MANAGE_CHANNELS",
    description: "🔒 Impede que @everyone envie mensagens em um canal específico",
    options: [
        {
            name: "canal",
            description: "Canal pra fechar",
            type: 7,
        }
    ],
    timeout: 3000,
    run: async(interaction) => {
        const channel = interaction.options.getChannel('channel') || interaction.channel;

        await channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: false });

        interaction.reply({ content: `🔒 | ${interaction.user}, **O  ${channel} Foi fechado!**` })
    }
}