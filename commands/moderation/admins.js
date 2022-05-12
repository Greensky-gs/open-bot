const { Message } = require('discord.js');
const { reply, classicEmbed } = require('../../assets/functions');

module.exports = {
    help: {
        name: 'admins',
        description: "Affiche la liste des administrateurs du serveur",
        aliases: ['adminslist'],
        cooldown: 5,
        permissions: []
    },
    /**
     * @param {Message} message 
     */
    run: async message => {
        const admins = (await message.guild.members.fetch()).filter(m => m.permissions.has('ADMINISTRATOR')).sort((a, b) => (a.nickname ? a.nickname : a.user.username) - (b.nickname ? b.nickname : b.user.username))

        const embed = classicEmbed(message.author)
            .setTitle(`${admins.size} admin${admins.size > 1 ? 's':''}`)
            .setColor(message.guild.me.displayHexColor)
            .setDescription(admins.map(x => `<@${x.id}>`).join(', '))

        reply(message, embed);
    }
}