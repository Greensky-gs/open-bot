const { MessageActionRow, MessageButton } = require('discord.js');

const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setStyle("SUCCESS")
            .setLabel("Confirmer")
            .setCustomId("yes"),
        new MessageButton()
            .setStyle("DANGER")
            .setLabel("Annuler")
            .setCustomId('no')
    );

module.exports = row;