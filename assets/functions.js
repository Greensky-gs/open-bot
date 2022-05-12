const { Message, User, MessageEmbed, GuildMember } = require('discord.js');

/**
 * @param {User} user
 */
const classicEmbed = (user) => {
    return new MessageEmbed()
            .setTimestamp()
            .setFooter({ text: user.username, iconURL: user.displayAvatarURL({ dynamic: true }) })
}

module.exports = {
    package: () => {
        return {
            commands: require('./data/commands'),
            configs: require('./data/config.json'),
            perms: require('./data/perms.json')
        }
    },
    /**
     * @param {User} user 
     */
    classicEmbed,
    /**
     * @param {{ member: GuildMember, mod: GuildMember, message: Message, reply: Boolean, checkOwner: Boolean }} data 
     */
    checkPerms: (data) => {
        let send = (data.reply == false);
        let checkOwner = data.checkOwner || true;

        const reply = (content) => {
            if (!send) return;
            data.message.channel.send({ content, reply: { messageReference: data.message } }).catch(() => {});
        };

        if (checkOwner) {
            if (data.member.id == data.member.guild.ownerId) {
                reply(`${data.member.user.username} est le propriétaire du serveur.`)
                return false;
            };
        };
        if (data.member.roles.highest.position >= data.mod.roles.highest.position) {
            reply(`${data.member.user.username} est supérieur ou égal à vous dans la hiérarchie des rôles`);
            return false;
        };
        if (data.member.roles.highest.position >= data.mod.guild.me.roles.highest.position) {
            reply(`${data.member.user.username} est supérieur ou égal à moi dans la hiérarchie des rôles`);
            return false;
        };
        if (!data.member.moderatable) {
            reply(`${data.member.user.username} n'est pas modérable.`);
            return false;
        };

        return true;
    },
    /**
     * @param {{ member: GuildMember, mod: GuildMember, action: String, reason: String }} data 
     */
    getModEmbeds: (data) => {
        const fields = [
            {name: 'Modérateur', value: `<@${data.mod.id}> ( \`${data.mod.id}\` ${data.mod.user.tag} )`, inline: true},
            {name: 'Raison', value: `${data.reason}`, inline: true},
            {name: 'Membre', value: `<@${data.member.id}> ( \`${data.member.id}\` ${data.member.user.tag} )`, inline: true}
        ];

        let majAct = data.action[0].toUpperCase() + data.action.slice(1).toLowerCase();

        const modEmbed = new MessageEmbed()
        .setFields(fields)
        .setTitle(majAct)
        .setColor("#ff0000")
        .setTimestamp()
        .setFooter({ text: `${data.mod.user.username} - ${data.action}`, iconURL: data.mod.user.displayAvatarURL({ dynamic: true }) })

        const userEmbed = new MessageEmbed()
        .setFields(fields)
        .setTitle(majAct)
        .setColor("#ff0000")
        .setTimestamp()
        .setFooter({ text: `${data.mod.guild.name} - ${data.action}`, iconURL: data.mod.guild.icon ? data.mod.guild.iconURL({ dynamic: true }) : data.mod.user.displayAvatarURL({ dynamic: true })})

        return { userEmbed, modEmbed };
    },
    invalidMember: (user) => {
        return classicEmbed(user)
            .setTitle("Membre invalide")
            .setDescription(`Le membre spécifié est invalide.\n> Réessayez avec l'identifiant ou la mention`)
            .setColor("#ff0000")
    },
    noReason: (user) => {
        return classicEmbed(user)
            .setTitle("Raison invalide")
            .setDescription(`Merci de préciser une raison valide.`)
            .setColor("#ff0000")
    },
    /**
     * @param {Message} message 
     * @param {String | MessageEmbed} content 
     */
    reply: async(message, content) => {
        let data = {
            reply: { messageReference: message }
        };

        if (typeof content == 'object') data.embeds = [ content ];
        else data.content = content;

        return await message.channel.send(data);
    }
}