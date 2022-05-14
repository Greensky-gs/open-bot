const { Message, Collection } = require('discord.js');
const run = require('../assets/message');

module.exports = {
    event: 'messageUpdate',
    /**
     * @param {Message} before 
     * @param {Message} after 
     */
    execute: (before, after) => {
        if (before.content == after.content) return;

        if (!after.channel.editSnipes) {
            after.channel.editSnipes = new Collection();
            after.channel.editSnipes.set(0, { before, after });
        } else {
            after.channel.editSnipes.set(after.channel.editSnipes.length, { before, after });
        };

        run(after);
    }
};