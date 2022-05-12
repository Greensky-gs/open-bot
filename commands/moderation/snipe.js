const { Message, MessageEmbed } = require('discord.js');
const { reply, classicEmbed } = require('../../assets/functions');

module.exports = {
    help: {
        name: 'snipe',
        description: "Affiche le dernier message supprimé dans le salon en mémoire",
        aliases: ['deletesnipe'],
        permissions: ['manage_messages'],
        cooldown: 5
    },
    /**
     * @param {Message} message 
     * @param {Array} args 
     */
    run: (message, args) => {
        let index = (parseInt(args[0]) || 1) - 1;

        if (isNaN(index)) index = 0;
        if (!isFinite(index)) index = 0;
        if (index < 0) index = 0;
        
        let snipe = message.channel.snipes.get(index);

        if (!snipe) return reply(message, "Ce snipe n'existe pas.");

        const embed = classicEmbed(snipe.author)
            .setTitle(`Snipe n°${index + 1}`)
            .setDescription(snipe.content ? snipe.content : "*Attachements.*")
            .setColor(message.guild.me.displayHexColor)

        reply(message, embed);
    }
}