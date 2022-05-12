const { Message } = require('discord.js');
const functions = require('../../assets/functions.js');

module.exports = {
    help: {
        name: 'kick',
        description: "Expulse un membre du serveur",
        aliases: ['expulse'],
        permissions: ['kick_members'],
        cooldown: 5
    },
    /**
     * @param {Message} message 
     * @param {Array} args 
     */
    run: async(message, args) => {
        await message.guild.members.fetch();
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        
        if (!member) return message.channel.send({ embeds: [ functions.invalidMember(message.author) ], reply:{ messageReference: message } }).catch(() => {});
        if (!functions.checkPerms({ mod: message.member, member, message: message, reply: true })) return;

        const reason = args.slice(1).join(' ');
        if (!reason) return functions.reply(message, functions.noReason(message.author));

        const embeds = functions.getModEmbeds({ member, mod: message.member, action: 'expulsion', reason });

        functions.reply(message, embeds.modEmbed);
        member.send({ embeds: [ embeds.userEmbed ] }).catch(() => {});

        member.kick(reason).catch(() => {});
    }
};