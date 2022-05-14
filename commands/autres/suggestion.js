const { Message, MessageEmbed } = require('discord.js');
const prefix = require('../../assets/functions').package().configs.prefix;

module.exports = {
    help: {
        name: 'suggestion',
        description: "Propose votre suggestion dans le salon",
        aliases: ['suggest'],
        permissions: [],
        cooldown: 5
    },
    /**
     * @param {Message} message 
     * @param {Array} args 
     */
    run: (message, args) => {
        message.delete().catch(() => {});
        let suggest = args.join(' ');

        if (!suggest) return message.channel.send({ content: `Merci de préciser une suggestion` }).catch(() => {});

        const embed = new MessageEmbed()
            .setTitle("Suggestion")
            .setFooter({ text: message.member.nickname ? message.member.nickname : message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setDescription(`Nouvelle suggestion de <@${message.author.id}>\n> Proposez votre suggestion avec \`${prefix}suggestion\``)
            .setColor("ORANGE")
            .setTimestamp()
        
        message.channel.send({ embeds: [ embed ] }).catch(() => {});
    }
};