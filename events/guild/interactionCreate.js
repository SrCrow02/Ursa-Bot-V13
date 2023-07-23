const Timeout = new Set()
const { MessageEmbed } = require('discord.js');
const humanizeDuration = require("humanize-duration");
const config = require('../../config.json');

module.exports = async(client, interaction, guild) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
		if (!client.slash.has(interaction.commandName)) return;
		if (!interaction.guild) return;
		const command = client.slash.get(interaction.commandName)
		try {
			if (command.timeout) {
				if (Timeout.has(`${interaction.user.id}${command.name}`)) {
					const embed = new MessageEmbed()
					.setTitle('Você está usando este comando rapido demais!')
					.setDescription(`Você precisa esperar **${humanizeDuration(command.timeout, { round: true })}** para usar o comando novamente`)
					.setColor('#ff0000')
					return interaction.reply({ embeds: [embed], ephemeral: true })
				}
			}
			if (command.permissions) {
				if (!interaction.member.permissions.has(command.permissions)) {
					const embed = new MessageEmbed()
					.setTitle('Não tem permissão')
					.setDescription(`:x: Você precisa \`${command.permissions}\` para usar esse comando`)
					.setColor('#ff0000')
					.setFooter(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
					.setTimestamp()
					return interaction.reply({ embeds: [embed], ephemeral: true })
				}
			}
			if (command.devs) {
				if (!config.ownersID.includes(interaction.user.id)) {
					return interaction.reply({ content: ":x: Apenas desenvolvedores podem usar esse comando", ephemeral: true });
				}
			}
			if (command.ownerOnly) {
				if (interaction.user.id !== interaction.guild.ownerId) {
					return interaction.reply({ content: "Apenas o dono do servidor por usar esse comando", ephemeral: true })
				}
			}
			command.run(interaction, client);
			Timeout.add(`${interaction.user.id}${command.name}`)
			setTimeout(() => {
				Timeout.delete(`${interaction.user.id}${command.name}`)
			}, command.timeout);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: ':x: Aconteceu um erro ao executar esse comando!', ephemeral: true });
		}
	}
} 