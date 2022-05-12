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
        message.channel.send({ content: `Vous êtes sur le point de supprimer ${message.channel.name}.\nÊtes-vous sûr de continuer ?`, components: [ row ], reply:{ messageReference: message } })
    }
}