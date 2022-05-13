const { readdirSync, readFileSync } = require('fs');
const { Collection } = require('discord.js');

const commands = new Collection();

const ignored = readFileSync('./assets/data/cmds-ignore.txt').toString().split(' ');

readdirSync('./commands').forEach((folder) => {
    readdirSync(`./commands/${folder}`).filter(x => x.endsWith('.js')).forEach(fileName => {
        const file = require(`../../commands/${folder}/${fileName}`);

        file.help.category = folder;

        if (!ignored.includes(file.help.name)) {
            if (!ignored.some((x) => file.help.aliases.includes(x))) {
                commands.set(file.help.name, file);
            };
        };
    });
});

module.exports = commands;