const { Message, Collection } = require('discord.js');

module.exports = {
    event: 'messageDelete',
    /**
     * @param {Message} message 
     */
    execute: message => {
        if(!message.channel.snipes) {
            message.channel.snipes = new Collection();
            message.channel.snipes.set(0, message);
        } else {
            message.channel.snipes.set(message.channel.snipes.size, message);
        };
    }
}