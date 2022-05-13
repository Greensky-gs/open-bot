const { Message } = require('discord.js');
const { reply, classicEmbed, package } = require('../../assets/functions');

module.exports = {
    help: {
        name: 'ignored',
        description: "Affiche les commandes ignorées",
        permissions: ['manage_guild'],
        aliases: [],
        cooldown: 5
    },
    /**
     * @param {Message} message 
     */
    run: message => {
        const ignored = package().ignored;

        if (ignored.length == 0) return reply(message, `Aucune commande n'est ignorée`);

        const embed = classicEmbed(message.author)
        .setTitle(`${ignored.length} commandes ignorée${ignored.length > 1 ? 's':''}`)
        .setColor("ORANGE")
        .setDescription(ignored.map((cmdName) => `\`${package().configs.prefix}${cmdName}\``).join(', '))

        reply(message, embed);
    }
};