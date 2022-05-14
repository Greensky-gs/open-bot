const { Message, Client } = require('discord.js');
const { reply, classicEmbed, random } = require('../../assets/functions');
const confirm = require('../../assets/data/confirm');

module.exports = {
    help: {
        name: 'roulette-russe',
        description: "Joue à la roulette russe",
        aliases: ['russian-roulette', 'rr'],
        permissions: [],
        cooldown: 5
    },
    /**
     * @param {Message} message 
     * @param {Array} args 
     * @param {Client} client 
     */
    run: (message, args, client) => {
        let data = {
            kick: false
        };

        message.channel.send({ embeds: [ classicEmbed(message.author)
            .setTitle("Kick")
            .setDescription(`Voulez-vous prendre le risque de vous faire expulser du serveur si vous perdez ?\n> Appuyez sur les boutons. Vous avez 2 minutes`)
            .setColor('ORANGE')
        ], components: [ confirm ] }).then((sent) => {
            const collector = sent.createMessageComponentCollector({ filter: i => i.user.id === message.author.id, time: 120000, max: 1 });

            collector.on('end', (collected, reason) => {
                sent.delete().catch(() => {});
                if (collected.size === 0) return reply(message, "Vous n'avez rien répondu");

                if (collected.first().customId === 'yes') {
                    data.kick = true;
                };

                const embed = classicEmbed(message.author)
                    
                if (random({ max: 6 }) === random({ max: 6 })) {
                    embed.setTitle('Perdu')
                    .setColor('#ff0000')
                    .setDescription(`Vous avez **perdu** à la roulette russe.${data.kick ? "\n> Vous serez expulsé dans **5 secondes**" : ""}`)
                    
                    if (data.kick) {
                        setTimeout(() => {
                            message.member.kick().catch(() => {});
                        }, 5000);
                    };
                } else {
                    embed.setTitle("Gagné")
                    .setColor('#00ff00')
                    .setDescription(`Vous avez **gagné** à la roulette russe.${data.kick ? "\n> Vous ne serez **pas** expulsé" : ""}`)
                };

                reply(message, embed);
            });
        });
    }
};