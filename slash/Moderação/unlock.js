module.exports = {
    name: "unlock",
    permissions: "MANAGE_CHANNELS",
    description: "🔒 Remover mensagens de envio negado de @everyone em um canal específico",
    options: [
        {
            name: "canal",
            description: "canal para abrir.",
            type: 7,
        }
    ],
    timeout: 3000,
    run: async(interaction, client) => {
        const channel = interaction.options.getChannel('channel') || interaction.channel;
        await channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: null });
        interaction.reply({ content: `🔓 | ${interaction.user}, **O ${channel} foi aberto.**` })
    }
}