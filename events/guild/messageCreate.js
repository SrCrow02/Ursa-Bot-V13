const Timeout = new Set();
const { EmbedBuilder } = require('discord.js')
const { prefix } = require('../../config.json')
const humanizeDuration = require("humanize-duration");

module.exports = async (client , message) => {
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    if(!message.member) message.member = await message.guild.members.fetch(message.member);
    if(!message.guild) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return; 
    const command = client.commands.get(cmd) || client.commands.find((x) => x.aliases && x.aliases.includes(cmd));
    if (command) {
        if (command.timeout) {
            if (Timeout.has(`${message.author.id}${command.name}`)) {
                const embed = new EmbedBuilder()
                .setTitle('Você está usando esse comando rapido demais!')
                .setDescription(`:x: Você precisa esperar **${humanizeDuration(command.timeout, { round: true })}** Para usar esse comando novamente!`)
                .setColor('#ff0000')
                return message.channel.send({ embeds: [embed] })
            } else {
                command.run(client, message, args);
                Timeout.add(`${message.author.id}${command.name}`)
                setTimeout(() => {
                    Timeout.delete(`${message.author.id}${command.name}`)
                }, command.timeout);
            }
        } else {
            command.run(client, message, args)
        }
    }
}