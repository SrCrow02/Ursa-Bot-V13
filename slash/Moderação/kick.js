module.exports = {
    name: "kick",
    description: "Chutar um membro",
    permissions: "KICK_MEMBERS",
    options: [
        {
            name: "user",
            description: "Usuario para chutar",
            type: 6,
            required: true
        },
        {
            name: "motivo",
            description: "Motivo do chute",
            type: 3,
        }
    ],
    timeout: 3000,
    run: async(interaction, client) => {
        const user = interaction.options.getMember('user');
        const motivo = interaction.options.getString('motivo') || '';

        //Emoji
        const est = client.emojis.cache.find(emoji => emoji.name === "estrela");
        const no = client.emojis.cache.find(emoji => emoji.name === "nocheck");

        if (user.id === interaction.user.id) {
            return interaction.reply({ content: `${no} | **Não pode se chutar** ` })
        }
        if (user.id === client.user.id) {
            return interaction.reply({ content: `${no} | **Não pode me chutar**` })
        }
        const botRole = interaction.guild.me.roles.highest.position;
        const role = user.roles.highest.position;
        const authorRole = interaction.member.roles.highest.position;

        if (authorRole <= role) {
            return interaction.reply(`${no} | **Não posso chutar este membro porque ele tem uma posição de função superior à minha ou igual a você!**`)
        }
        if (botRole <= role) {
            return interaction.reply(`${no} | **Não posso chutar este membro porque ele tem uma posição de função superior à minha ou igual a você!**`)
        }
        try {
            await user.kick(motivo);
            interaction.reply(`:tada: | ${interaction.user}, O **${user} foi chutado** do servidor\n\n **Motivo:**` + '```' + `${motivo}` + '```')
        } catch (e) {
            console.error(e);
            return interaction.reply({ content: `Erro: ${e}` })
        }
    }
}