const { Message } = require('discord.js');
const commands = require('./data/commands');
const { prefix, replyToMention } = require('./data/config.json');
const cooldowns = require('./data/cooldowns');
const permissions = require('./data/perms.json');
const errors = require('./data/errors');

/**
 * @param {Message} message
 */
const exported = (message) => {
    if (!message.guild || message.author.bot || message.webhookId) return;

    if (message.mentions.has(message.client.user.id) && !message.mentions.everyone && replyToMention == true) {
        message.channel.send({ content: `Bonjour ! Mon préfixe est \`${prefix}\` !`, reply: { messageReference: message } });
    };

    const lower = message.content.toLowerCase();
    if (!lower.startsWith(prefix)) return;

    let args = message.content.slice(prefix.length).split(' ');
    let commandName = args.shift().toLowerCase();

    let command = commands.get(commandName) || commands.find(x => x.help.aliases && x.help.aliases.includes(commandName));

    if (!command) return;

    const cId = `${message.author.id}.${command.help.name}`;
    if (!cooldowns.has(cId)) {
        cooldowns.set(cId, (command.help.cooldown * 1000) + Date.now());
        setTimeout(() => cooldowns.delete(cId), command.help.cooldown * 1000);
    } else {
        message.channel.send({ content: `Vous avez un cooldown sur cette commande. Réessayez <t:${(cooldowns.get(cId) / 1000).toFixed(0)}:R>`, reply: { messageReference: message } });
        return;
    };

    for (let perm in command.help.permissions) {
        perm = perm.toUpperCase();

        if (!message.member.permissions.has(perm)) {
            if (!has) {
                var has = [ permissions[perm] ];
            } else {
                has.push(permissions[perm]);
            };
        };
    };

    if (has !== undefined) {
        return message.channel.send({ content: `Vous n'avez pas les permissions ${has.map(x => `\`${x}\``).join(', ')}`, reply: { messageReference: message } });
    };

    const run = new Promise((resolve) => resolve(command.run(message, prefix)));
    run.catch((error) => {
        console.log(error);

        let content = `Une erreur a eu lieu lors de l'exécution de la commande.\nVous n'êtes pas censé rencontrer ce message d'erreur`;
        if (!errors.has(message.author.id)) errors.set(message.author.id, 1);
        else {
            if (errors.get(message.author.id) > 2)  {
                content+=`\nSi l'erreur persiste, contactez mon développeur`;
            };
            errors.set(message.author.id, errors.get(message.author.id) + 1);
        };
        
        message.channel.send({ content, reply: { messageReference: message } });
    });
};

module.exports = exported;