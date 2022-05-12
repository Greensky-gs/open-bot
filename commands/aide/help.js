const { Message, MessageActionRow, MessageSelectMenu, SelectMenuInteraction, IntegrationApplication } = require('discord.js');
const { reply, classicEmbed, package } = require('../../assets/functions');
const commands = require('../../assets/data/commands');

module.exports = {
    help: {
        name: 'help',
        description: "Affiche la page d'aide du bot",
        aliases: ['aide'],
        permissions: [],
        cooldown: 5
    },
    /**
     * @param {Message} message 
     */
    run: message => {
        let baseContent = `Mon préfixe est \`${package().configs.prefix}\`. Je suis un bot **open source**, trouvable sur [github](${package().configs.github}).`;

        const selector = new MessageSelectMenu()
            .setCustomId('select-menu')
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Choisissez une catégorie")

        commands.forEach((cmd) => {
            if (!selector.options.find(x => x.value == cmd.help.category)) selector.addOptions({ description: `Catégorie ${cmd.help.category}`, label: cmd.help.category, value: cmd.help.category });
        });        

        selector.addOptions({ description: "Fermer le menu", label: "Fermer", value: 'close' });

        const row = new MessageActionRow({ components: [ selector ] });

        const embed = classicEmbed(message.author)
        .setTitle("Page d'aide")
        .setColor(message.guild.me.displayHexColor)
        .setDescription(baseContent)

        message.channel.send({ reply: { messageReference: message }, embeds: [ embed ], components: [ row ] }).then((sent) => {
            const collector = sent.createMessageComponentCollector({ filter: x => x.user.id === message.author.id, time: 120000 });

            collector.on('collect', /** @param {SelectMenuInteraction} interaction */ (interaction) => {
                let id = interaction.values[0];
                
                if (id == 'close') {
                    const close = classicEmbed(message.author)
                        .setTitle("Aide fermée")
                        .setColor("ORANGE")
                        .setDescription(`Menu d'aide fermé par <@${message.author.id}>`)

                    interaction.message.edit({ embeds: [ close ], components: [] });
                    collector.stop('close');

                    interaction.reply({ content: `Menu fermé`, ephemeral: true }).then(() => {
                        setTimeout(() => {
                            interaction.deleteReply().catch(() => {});
                        }, 2500);
                    });
                } else {
                    let cmds = commands.filter(x => x.help.category == id);
                    
                    let content = baseContent + '\n' + cmds.map((cmd) => `\`${package().configs.prefix}${cmd.help.name}\` : ${cmd.help.description}`).join('\n')
    
                    embed.setDescription(content);
    
                    interaction.message.edit({ embeds: [ embed ] });
    
                    interaction.reply({ content: `Catégorie ${id}`, ephemeral: true }).then(() => {
                        setTimeout(() => {
                            interaction.deleteReply().catch(() => {});
                        }, 2500);
                    });
                };
            });
        });
    }
}