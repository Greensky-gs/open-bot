const { Message, Collection } = require('discord.js');

module.exports = {
    help: {
        name: 'clear',
        description: "Supprime des messages dans le salon actuel ( un nombre et un membre peuvent être précisés )",
        aliases: [],
        permissions: ['manage_messages'],
        cooldown: 5
    },
    /**
     * @param {Message} message 
     * @param {Array} args 
     */
    run: async(message, args) => {
        let number = 100;
        let member = message.mentions.users.first();

        args.forEach((arg) => {
            let test = parseInt(arg);
            if (!isNaN(test) && test > 0 && test <= 100) number = test;
        });

        let messages = new Collection();
        await message.delete().catch(() => {});
        await message.channel.messages.fetch();

        if (member) {
            let messagesList = message.channel.messages.cache.filter(x => x.author.id == member.id).toJSON();
            
            for (let i = 0; i < number; i++) {
                messages.set(messagesList[i].id, messagesList[i]);
            };
        } else {
            messages = message.channel.messages.fetch({ limit: number });
        };


        message.channel.bulkDelete(messages).catch(() => {});
        message.channel.send({ content: `J'ai supprimé \`${number}\` message(s)` }).then((sent) => {
            setTimeout(() => {
                sent.delete().catch(() => {});
            });
        });
    }
}