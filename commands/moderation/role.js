const Discord = require('discord.js');
const functions = require('../../assets/functions');

module.exports = {
    help: {
        name: "role",
        description: "Ajoute ou supprime un ou plusieurs rôles à un ou plusieurs membres",
        aliases: ["unrank", "addrole", "derank", "unrank"],
        permissions: ['manage_roles'],
        cooldown: 5
    },
    /**
     * @param {Discord.Message} message 
     * @param {Array} args 
     * @param {Discord.Client} client 
     * @param {String} prefix 
     * @param {String} lang 
     */
    run: async(message, args, client, prefix, lang) => {
        await message.guild.members.fetch();
        await message.guild.roles.fetch();

        let members = new Discord.Collection();
        let roles = new Discord.Collection();

        args.forEach((arg) => {
            let memberTest = message.guild.members.cache.get(arg);
            if (memberTest) {
                if (!members.has(memberTest.id)) members.set(memberTest.id, memberTest);
            } else {
                let roleTest = message.guild.roles.cache.get(arg);
                if (roleTest) {
                    if (!roles.has(roleTest.id)) roles.set(roleTest.id, roleTest);
                };
            };
        });

        message.mentions.members.filter(x => !members.has(x.id)).forEach(x => members.set(x.id, x));
        message.mentions.roles.filter(x => !roles.has(x.id)).forEach(x => roles.set(x.id, x));

        if (members.size == 0) return functions.reply(message, `Je n'ai trouvé aucun membre valide.`);
        if (roles.size ==0) return functions.reply(message, `Je n'ai trouvé aucun rôle valide.`);

        let validMember = new Discord.Collection();
        let validRoles = new Discord.Collection();

        members.forEach((x) => {
            if (functions.checkPerms({ member: x, mod: message.author, reply: false }) == true) {
                validMember.set(x.id, x);
            };
        });
        roles.forEach((x) => {
            if (x.position < message.guild.me.roles.highest.position) {
                validRoles.set(x.id, x);
            };
        });

        if (validMember.size == 0) return functions.reply(message, `Je n'ai trouvé membre valide à qui ajouter des rôles.\n> Réessayez en positionnant mon rôle plus haut dans la hiérarchie des rôles.`);
        if (validRoles.size ==0) return functions.reply(message, `Je n'ai trouvé aucun rôle valide à ajouter.\n> Réeesyez en positionnant mon rôle plus haut dans la hiérarchie des rôles.`);

        let added = [];
        let removed = [];

        validMember.forEach(/** @param {Discord.GuildMember} member*/(member) => {
            validRoles.filter(x => !member.roles.cache.has(x.id)).forEach((role) => {
                added.push({
                    user: member.user.id,
                    role: role.id
                });
                member.roles.add(role).catch(() => {});
            });
            validRoles.filter(x => member.roles.cache.has(x.id)).forEach((role) => {
                removed.push({
                    user: member.id,
                    role: role.id
                });
                member.roles.remove(role).catch(() => {});
            });
        });

        const embedAdd = package.embeds.classic(message.author)
            .setTitle("Rôles ajoutés")
            .setDescription(added.map(x => `Rôle <@&${x.role}> ajouté à <@${x.user}>`).join(', '))
            .setColor("#00ff00")
        const embedRemove = package.embeds.classic(message.author)
            .setTitle("Rôles retirés")
            .setDescription(removed.map(x => `Rôle <@&${x.role}> retiré à <@${x.user}>`).join(', '))
            .setColor("#ff0000")

        let sent = [];
        if (added.length !== 0) sent.unshift(embedAdd);
        if (removed.length !== 0) sent.unshift(embedRemove);

        message.channel.send({ embeds: sent, reply: { messageReference: message } });
    }
}