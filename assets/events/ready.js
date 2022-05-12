const { Client } = require('discord.js');

module.exports = {
    event: 'ready',
    /**
     * @param {Client} client 
     */
    execute: (client) => {
        const data = require('../assets/data/config.json');
        
        client.user.setActivity({
            name: data.statut,
            type: data.status,
        });

        client.user.setUsername(data.name);
        if (data.pfp.length > 0) client.user.setAvatar(data.pfp);

        console.log(`Logged as ${client.user.tag}`);
    }
}