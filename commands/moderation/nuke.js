const { Message } = require('discord.js');
const row = require('../../assets/data/confirm');

module.exports = {
    help: {
        name: 'nuke',
        description: "Nuke le salon actuel",
        aliases: [],
        permissions: ['administrator'],
        cooldown: 5,
    },
    /**
     * @param {Message} message 
     */
    run: message => {
        const nuke = async() => {
            const propreties = {
                name: message.channel.name,
                parentID: message.channel.parentId,
                description: message.channel.topic,
                nsfw: message.channel.nsfw,
                rawPosition: message.channel.rawPosition,
                rateLimit: message.channel.rateLimitPerUser
            };

            const nuked = await message.channel.clone();
            nuked.name = propreties.name;
            nuked.parentId = propreties.parentID;
            nuked.topic = propreties.topic;
            nuked.nsfw = propreties.nsfw;
            nuked.rateLimitPerUser = propreties.rateLimit;

            message.channel.delete().catch(() => {});
            nuked.setPosition(propreties.rawPosition);
            
            nuked.send({ content: `Salon nuké par <@${message.author.id}>` }).catch(() => {});
        }

        message.channel.send({ content: `Vous êtes sur le point de supprimer ${message.channel.name}.\nÊtes-vous sûr de continuer ?`, components: [ row ], reply:{ messageReference: message } }).then((sent) => {
            const collector = sent.createMessageComponentCollector({ filter: x => x.user.id == message.author.id, time: 120000, max: 1 });

            collector.on('end', (collected) => {
                sent.delete().catch(() => {});
                if (!collected.first()) return require('../../assets/functions').reply(message, ":bulb: Commande annulée").catch(() => {});

                if (collected.first().customId == 'yes') {
                    nuke();
                } else {
                    require('../../assets/functions').reply(message, ":bulb: Commande annulée").catch(() => {});
                }
            });
        });
    }
}