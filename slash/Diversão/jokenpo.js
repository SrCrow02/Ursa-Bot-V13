const { MessageEmbed } = require('discord.js');
const firebase = require('firebase');
let database = firebase.database();
const jimp = require('jimp');

module.exports = {
    name: "jokenpo",
    description: "🚀 | Pedra, papel e tesoura",
    options: [
        {
            name: "jogar",
            description: "Escolha entre: Pedra, Papel e Tesoura",
            type: 3,
            required: true
        },
    ],
    run: async(interaction, client) => {
        const jogar = interaction.options.getString('jogar');

            const rng = Math.floor((Math.random() * 100) + 1); //Rand

        //Declarando se venceu ou lost
        if (jogar === 'pedra' && rng > 0 && rng <= 34) {
            return interaction.reply('**pedra**, Empatamos :)');
        } else if (jogar === 'pedra' && rng > 34 && rng <= 67) {
            return interaction.reply('**papel**, Você perdeu! ');
        } else if (jogar === 'pedra' && rng > 67 && rng <= 100) {
            return interaction.reply('**tesoura**, Eu perdi :(');
        } else if (jogar === 'papel' && rng > 0 && rng <= 34) {
            return interaction.reply('**papel**, Empatamos :)');
        } else if (jogar === 'papel' && rng > 34 && rng <= 67) {
            return interaction.reply('**tesoura**, Você perdeu!');
        } else if (jogar === 'papel' && rng > 67 && rng <= 100) {
            return interaction.reply('**pedra**, Eu perdi :(');
        } else if (jogar === 'tesoura' && rng > 0 && rng <= 34) {
            return interaction.reply('**tesoura**, Empatamos :)');
        } else if (jogar === 'tesoura' && rng > 34 && rng <= 67) {
            return interaction.reply('**pedra**, Você perdeu!');
        } else if (jogar === 'tesoura' && rng > 67 && rng <= 100) {
            return interaction.reply('**papel**, Eu perdi :(');
        }
    }
}