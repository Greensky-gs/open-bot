const { Message } = require('discord.js');

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
        
    }
}