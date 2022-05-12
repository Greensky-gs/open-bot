const Discord = require('discord.js');
const functions = require('../../assets/functions');

module.exports = {
    help: {
        name: "banlist",
        description: "Affiche la liste de toutes les personnes bannies du serveur",
        permissions: ['ban_members'],
        aliases: ['banliste'],
        cooldown: 5
    },
    /**
     * @param {Discord.Message} message 
     * @param {Array} args 
     * @param {Discord.Client} client 
     * @param {String} prefix 
     * @param {String} lang 
     */
    run: async(message, args) => {
        await message.guild.bans.fetch();

        let bans = message.guild.bans.cache.map((ban) => ban.user.username).join(', ');

        if (!bans) return functions.reply(message, "Il n'y a aucun membre banni dans le serveur");

        const embed = functions.classicEmbed(message.author)
            .setTitle("Bans")
            .setColor("ORANGE")
            .setDescription(bans)
            .setAuthor({ name: `${message.guild.bans.cache.size} bans`, iconURL: (message.guild.iconURL({ dynamic: true }) || message.author.displayAvatarURL({ dynamic: true }) ) })
            
        functions.lineReply(message, embed);
    }
}