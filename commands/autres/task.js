const { Message, MessageActionRow, MessageButton } = require('discord.js');
const { classicEmbed, reply } = require('../../assets/functions');

module.exports = {
    help: {
        name: 'tache',
        permissions: ['administrator'],
        description: "Créer une nouvelle tâche dans le salon.",
        cooldown: 5,
        aliases: ['task'],
    },
    /**
     * @param {Message} message
     * @param {Array} args
     */
    run: (message, args) => {
        let description = args.join(' ');
        if (!description) return reply(message, `Merci de préciser la description de la tâche`);

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton({ customId: 'task.start', label: 'Commencer', style: 'SUCCESS' }),
                new MessageButton({ customId: 'task.end', label: 'Terminer', style: 'SECONDARY' }),
                new MessageButton({ customId: 'task.cancel', label: 'Annuler', style: 'DANGER' })
            );

        const embed = classicEmbed(message.author)
            .setTitle("Tâche à faire")
            .setDescription(`Tâche de <@${message.author.id}> (utilisez les boutons ci-dessous)\n\n\`\`\`${description}\`\`\``)
            .setColor('#7a96ea')

        message.delete().catch(() => {});
        message.channel.send({ embeds: [ embed ], components: [ row ] }).catch(() => {});
    }
}