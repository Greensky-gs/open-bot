const { Message, Collection, MessageActionRow, MessageButton } = require('discord.js');
const { reply, random, classicEmbed } = require('../../assets/functions');

module.exports = {
    help: {
        name: 'game-number',
        description: "Lance une partie du jeu du nombre mystère",
        aliases: ['gamenumer'],
        permissions: [],
        cooldown: 5
    },
    /**
     * @param {Message} message 
     */
    run: (message) => {
        let trash = new Collection();

        const collector = message.channel.createMessageCollector({ filter: x => x.content == "multi" || x.content == 'solo' || (parseInt(x.content) >= 0 && parseInt(x.content) <= 100), time: 120000 });

        let step = "mode";
        let multi;
        let number = random();
        let winner;

        message.channel.send({ content: `Choisissez votre mode de jeu : \`mutli\` ( mutlijoueur ) ou \`solo\` ( solitaire )` }).then(x => trash.set(x.id, x));

        collector.on('collect', (msg) => {
            if (multi == true && msg.author.id !== message.author.id) trash.set(msg.id, msg);

            if (step == 'mode') {
                if (msg.content.toLowerCase() == 'solo') {
                    multi = false;
                } else if (msg.content.toLowerCase() == 'multi') {
                    multi = true;
                };
                step = 'play';

                message.channel.send({ content: `J'ai choisis mon nombre entre **0** et **100**`, reply: { messageReference: msg } }).then(x => trash.set(x.id, x));
            };

            let guess = parseInt(msg.content);
            const send = (content) => {
                message.channel.send({ content: content, reply: { messageReference: msg } }).then(x => trash.set(x.id, x));
            };

            if (guess > number) send("Mon nombre est plus petit")
            else if (guess < number) send("Mon nombre est plus grand");
            else {
                collector.stop('end');
                winner = msg.author.id;
            };
        });

        collector.on('end', (collected, reason) => {
            if (reason == 'end') {
                reply(message, `<@${winner}> a trouvé le nombre !`);

                const embed = classicEmbed(message.author)
                    .setTitle("Supprimer les messages")
                    .setDescription(`Appuyer sur le bouton pour supprimer les messages`)
                    .setColor(message.guild.me.displayHexColor)
                
                const row = new MessageActionRow({ components: [ new MessageButton({ customId: "game-number.delete-msgs", label: 'Supprimer les messages', style: 'DANGER' }) ] });

                message.channel.send({ embeds: [ embed ], reply: { messageReference: message }, components: [ row ] }).then((sent) => {
                    const deleteCollector = sent.createMessageComponentCollector({ filter: x => x.user.id == message.author.id, time: 300000, max: 1 });

                    deleteCollector.on('end', (collected) => {
                        if (collected.size == 1) {
                            trash.set(sent.id, sent);

                            message.channel.bulkDelete(trash);
                        };
                    });
                });
            };
        });
    }
};