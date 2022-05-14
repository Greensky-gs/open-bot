const { Message } = require('discord.js');
const { reply, classicEmbed } = require('../../assets/functions');

module.exports = {
    help: {
        name: 'editsnipe',
        description: "Affiche le dernier message modifié dans le salon en mémoire",
        aliases: ['modifysnipe'],
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
        
        let snipe = message.channel.editSnipes.get(index);

        if (!snipe) return reply(message, "Ce snipe n'existe pas.");

        const embed = classicEmbed(snipe.after.author   )
            .setTitle(`Editsnipe n°${index + 1}`)
            .setDescription(`Avant:\n${snipe.before.content ? snipe.before.content : "*Pièces-jointes.*"}\n\nAprès :\n${snipe.after.content ? snipe.after.content : '*Pièces-jointes.*'}`)
            .setColor(message.guild.me.displayHexColor)

        reply(message, embed);
    }
}