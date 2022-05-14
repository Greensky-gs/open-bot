const { ButtonInteraction } = require('discord.js');

module.exports = {
    event: 'interactionCreate',
    /**
     * @param {ButtonInteraction} interaction
     */
    execute: interaction => {
        if (interaction.isButton()) {
            const id = interaction.customId;

            if (id == 'task.start') {
                const title = "Tâche en cours";
                const embed = interaction.message.embeds[0];

                embed.setTitle(title);
                embed.setColor('#007f66');
                
                interaction.message.edit({ embeds: [ embed ] }).catch(() => {});
                interaction.reply({ content: `Tâche marquée comme commencée par <@${interaction.user.id}>` });
            } else if (id == 'task.end') {
                const title = "Tâche terminée";
                const embed = interaction.message.embeds[0];

                embed.setTitle(title);
                embed.setColor('#ffb433');
                
                interaction.message.edit({ embeds: [ embed ] }).catch(() => {});
                interaction.reply({ content: `Tâche marquée terminée par <@${interaction.user.id}>` });
            } else if (id == 'task.cancel') {
                const title = "Tâche annulée";
                const embed = interaction.message.embeds[0];

                embed.setTitle(title);
                embed.setColor('#892621');
                
                interaction.message.edit({ embeds: [ embed ] }).catch(() => {});
                interaction.reply({ content: `Tâche annulée par <@${interaction.user.id}>` });
            }
        };
    }
}