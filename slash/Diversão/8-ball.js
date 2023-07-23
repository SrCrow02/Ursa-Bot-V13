const { MessageEmbed } = require('discord.js');
const firebase = require('firebase');
let database = firebase.database();
const jimp = require('jimp');

var fortunes = [
    "Sim",
    "Não",
    "Talvez",
    "Eu não sei",
    "Quem sabe?",
    "Isso é um mistério",
    "Não posso te contar",
    "Meu informante disse que não",
    "Provavelmente",
    "Me pergunte mais tarde!",
    "Claro que não!",
    "Não conte comigo para isso",
    "Dúvido muito",
    "Provavelmente sim",
    "Provavelmente nao",
    "Perguta para seu pai!"

  ];

module.exports = {
    name: "8ball",
    description: "🚀 | Fazer uma pergunta",
    options: [
        {
            name: "pergunta",
            description: "Pergunta que deseja fazer",
            type: 3,
            required: true
        },
    ],

    run: async(interaction, client) => {
        const pergunta = interaction.options.getString('pergunta');

        if(pergunta.length > 60) {
            return interaction.reply(`:x: | **Só pode usar 60 caracteres!!!**`)
        }

        var rand1 = fortunes[Math.floor(Math.random() * fortunes.length)];

        interaction.reply(`${interaction.user}: ${pergunta}\n` + `**${rand1}**`)
    }
}

