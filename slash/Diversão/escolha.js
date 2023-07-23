const Discord = require('discord.js');
const superagent = require(`superagent`)

module.exports = {
    name: "escolha",
    description: "🚀 | Me dê 2 alternativas, e aleatoriamente, irei escolher uma.",
    options: [
        {
            name: "alternativa1",
            description: "primeira alternativa!",
            type: 3,
            required: true,
        },
        {
            name: "alternativa2",
            description: "segunda alternativa!",
            type: 3,
            required: true,
        }
    ],

    run: async(interaction, client) => {
        const argumento1 = interaction.options.getString('alternativa1') || '';
        const argumento2 = interaction.options.getString('alternativa2') || '';

        if(argumento1.length > 100 || argumento2.length > 100) {
            return interaction.reply(`Ops ${interaction.user}, Você só pode escrever até 100 caracteres!!!`)
        }

        const array = ['primeira', 'segunda'];

        let rand = array[Math.floor(Math.random() * array.length)];

        if(rand == "primeira"){
            return interaction.reply(`Acho que você deveria acreditar na PRIMEIRA alternativa!! **${argumento1}**`)
        } else {
            return interaction.reply(`Acho que você deveria acreditar na SEGUNDA alternativa!! **${argumento2}**`)
        }
    }
}