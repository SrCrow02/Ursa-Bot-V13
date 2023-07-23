const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "help",
    description: "🧠 | help command",
    timeout: 5000,
    run: async(interaction, client) => {
        const user = interaction.options.getUser('user') || interaction.user;

    //Emojis
    const tarefas = client.emojis.cache.find(emoji => emoji.name === "tarefas");
    const setadireita = client.emojis.cache.find(emoji => emoji.name === "setadireita");


        const embed_i = new MessageEmbed()
        .setTitle("Help Command")
        .setColor("BLUE")
        .setDescription(`${setadireita} | Olá ${interaction.user}!, Esta é minha lista de comando, selecione uma das opçoes abaixo! :D\n\n${tarefas} | Comandos: **28**` + '```' + `Açoes, Moderação, Uteis, Diversão, Economia` + '```')
        .setImage('https://media.discordapp.net/attachments/966086686205435917/967887820922437672/mevvy8163_cloud_div_3-1-2.gif?width=656&height=43')
        .setThumbnail("https://media.discordapp.net/attachments/993979883166371941/996798240454344704/tarefas.png")
       
        const embed_i2 = new MessageEmbed()
        .setTitle("Help Command")
        .setColor("BLUE")
        .setDescription(`${setadireita} | Olá ${interaction.user}!, Esta é minha lista de comandos, selecione uma das opçoes abaixo! :D`)
        .setImage('https://media.discordapp.net/attachments/966086686205435917/967887820922437672/mevvy8163_cloud_div_3-1-2.gif?width=656&height=43')
        .setThumbnail("https://media.discordapp.net/attachments/993979883166371941/996798240454344704/tarefas.png")


        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('select')
                .setPlaceholder('Selecione a opção desejada!')
                .addOptions([
                    { //edit the option according to you ⚠leave the emoji fields like they are 
                        label: 'home',
                        description: 'Voltar a mensagem inicial',
                        value: 'inicial',
                    },
                    { //edit the option according to you ⚠leave the emoji fields like they are 
                        label: 'Açoes',
                        description: 'Comandos de ação',
                        value: 'ac',
                    },
                    { //edit the option according to you ⚠leave the emoji fields like they are 
                        label: 'Uteis',
                        description: 'Comandos uteis',
                        value: 'uteis',
                    },
                    { //edit the option according to you ⚠leave the emoji fields like they are 
                        label: `Moderação`,
                        description: 'Comandos de moderação',
                        value: 'mod',
                    },
                    { //edit the option according to you ⚠leave the emoji fields like they are 
                        label: 'Economia',
                        description: 'Comandos de economia',
                        value: 'economia',
                    },
                    {
                        label: 'Diversão',
                        description: 'Comandos de diversão',
                        value: 'funny', 
                    }               
                ]),
        );

        await interaction.reply({  embeds: [embed_i], components: [row]})//edit the content here
         //this sends it as empheral so that the chat does not get choked with these 

         const Collector = interaction.channel.createMessageComponentCollector({
             componentType: "SELECT_MENU"
         })

         Collector.on('collect', async (collected) => {
             const value = collected.values[0]

            if(value === "uteis"){

                 const embed_help = new MessageEmbed()
                 .setTitle("Comandos ° Uteis")
                 .setColor("BLUE")
                 .setDescription('```' + `avatar, notas, botinfo, help, register, servericon, ping, cotação` + '```')
                 .setImage('https://media.discordapp.net/attachments/966086686205435917/967887820922437672/mevvy8163_cloud_div_3-1-2.gif?width=656&height=43')

                 await collected.update({ embeds: [embed_help], components: [row]})

            } else if(value === "mod") {

                 const embed_help = new MessageEmbed()
                 .setTitle("Comandos ° Moderação")
                 .setColor("BLUE")
                 .setDescription('```' + `ban, clear, kick, lock, unlock` + '```')
                 .setImage('https://media.discordapp.net/attachments/966086686205435917/967887820922437672/mevvy8163_cloud_div_3-1-2.gif?width=656&height=43')

                 await collected.update({ embeds: [embed_help], components: [row]})
            } else if(value === "economia") {

                 const embed_help = new MessageEmbed()
                 .setTitle("Comandos ° Economia")
                 .setColor("BLUE")
                 .setDescription('```' + 'daily, atm, pay, roleta, cooldown, coinflip' + '```')
                 .setImage('https://media.discordapp.net/attachments/966086686205435917/967887820922437672/mevvy8163_cloud_div_3-1-2.gif?width=656&height=43')    

                 await collected.update({ embeds: [embed_help], components: [row]})        
             }else if(value === "funny"){

                const embed_help = new MessageEmbed()
                .setTitle("Comandos ° Diversão")
                .setColor("BLUE")
                .setDescription('```' + 'conquista, jokenpo, gado, 8-ball, escolha' + '```')
                .setImage('https://media.discordapp.net/attachments/966086686205435917/967887820922437672/mevvy8163_cloud_div_3-1-2.gif?width=656&height=43')   

                await collected.update({ embeds: [embed_help], components: [row]})   
             } else if(value === "ac"){

                const embed_help = new MessageEmbed()
                .setTitle("Comandos ° Açoes")
                .setColor("BLUE")
                .setDescription('```' + 'abraçar, beijar, tapa, cafuné' + '```')
                .setImage('https://media.discordapp.net/attachments/966086686205435917/967887820922437672/mevvy8163_cloud_div_3-1-2.gif?width=656&height=43')   

                await collected.update({ embeds: [embed_help], components: [row]})   
             } else if(value === "inicial") {
                 await collected.update({ embeds: [embed_i2], components: [row]})
            }
        })
    } 
}