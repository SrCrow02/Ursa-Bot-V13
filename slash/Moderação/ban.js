const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'ban',
    description: 'Banir um usuario',
    options: [
                {
                    name: 'usuário',
                    type: 6,
                    description: 'Usuário a ser banido.',
                    required: true
                },
                {
                    name: 'motivo',
                    type: 3,
                    description: 'Motivo do ban.',
                    required: false
                }
            ],
        
    run: async(interaction, client) => {
        const user = interaction.options.getUser('usuário')
        const reason = interaction.options.getString('motivo') || 'Motivo não especificado.'

        const mod = client.emojis.cache.find(emoji => emoji.name === "mod");
        let no = client.emojis.cache.find(emoji => emoji.name === "nocheck"); 
        let est = client.emojis.cache.find(emoji => emoji.name === "estrela");

        if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply({ content: `${no} | Você precisa de permissão para banir membros no servidor.`, ephemeral: true })

        if (interaction.user.id === user.id) return interaction.reply({ content: 'Você não pode se banir.', ephemeral: true })

        const member = interaction.guild.members.cache.get(user.id)
        if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ content: `${no} | Você só pode banir membros com cargo abaixo do seu.`, ephemeral: true })
        if (interaction.guild.me.roles.highest.position <= member.roles.highest.position) return interaction.reply({ content: `${no} | Não consigo banir este usuário, o cargo dele não é mais baixo que o meu.`, ephemeral: true })

        interaction.guild.members.ban(user, { reason })
            .then(() => interaction.reply({ content: `${est} | ${interaction.user} Você baniu o usuário \`${user.tag}\` com sucesso!\n\n**Motivo:**`+ '```' + `${reason}` + '```'}))
            .catch(() => interaction.reply({ content: 'Erro ao banir o usuário!', ephemeral: true }))
    }
}