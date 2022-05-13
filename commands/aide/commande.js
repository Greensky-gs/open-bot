const { Message } = require('discord.js');
const { reply, classicEmbed, package } = require('../../assets/functions');
const commands = require('../../assets/data/commands');

module.exports = {
    help: {
        name: 'commande',
        description: "Affiche les informations d'une commande",
        aliases: ['cmd'],
        permissions: [],
        cooldown: 5
    },
    /**
     * @param {Message} message 
     * @param {Array} args 
     */
    run: (message, args) => {
        let cmdName = (args.shift() || 'no command').toLowerCase();
        let cmd = commands.get(cmdName) || commands.find(x => x.help.aliases.includes(cmdName));
        
        if (!cmd) return reply(message, `Cette commande n'existe pas.\nVérifiez que cette commande n'est pas ignorée ( \`${package().configs.prefix}ignored\` )`);

        const embed = classicEmbed(message.author)
            .setTitle(`Commande ${cmdName}`)
            .setColor('ORANGE')
            .setDescription(`__**Description :**__ ${cmd.help.description}`)
            .addFields(
                {
                    name: 'Alias', value: cmd.help.aliases.length > 0 ? cmd.help.aliases.map(x => `\`${package().configs.prefix}${x}\``).join(', ') : 'Aucun alias', inline: true
                },
                {
                    name: 'Permissions', value: cmd.help.permissions.length > 0 ? cmd.help.permissions.map((perm) => `\`${package().perms[perm.toUpperCase()]}\``).join(', ') : 'Pas de permissions nécéssaires', inline: true
                },
                {
                    name: 'Cooldown', value: (cmd.help.cooldown || 5) + ` secondes`, inline: true
                }
            )

        reply(message, embed);
    }
}