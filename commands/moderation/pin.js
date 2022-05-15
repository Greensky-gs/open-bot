const { Message } = require('discord.js');
const { reply } = require('../../assets/functions');

module.exports = {
    help: {
        name: 'pin',
        description: "Épingle le message cité en réponse",
        aliases: ['épingle'],
        permissions: ['manage_messages'],
        cooldown: 5
    },
    /**
     * @param {Message} message 
     */
    run: async(message) => {
        let msgData = message.reference;

        if (!msg) return reply(message, `Merci de répondre à un message lors de l'exécution de la commande`);

        await message.channel.messages.fetch();
        let msg = message.channel.messages.cache.get(msgData.messageId);

        if (!msg) return reply(message, `Je ne trouve pas ce message.`);

        if (!msg.pinned) msg.pin().catch(() => {});
        message.delete().catch(() => {});

        reply(msg, `Message épinglé`);
    }
};