const { readdirSync } = require('fs');
const { Collection } = require('discord.js');

const commands = new Collection();

readdirSync('./commands').forEach((folder) => {
    readdirSync(`./commands/${folder}`).filter(x => x.endsWith('.js')).forEach(fileName => {
        const file = require(`../../commands/${folder}/${fileName}`);

        file.help.category = folder;
        commands.set(file.help.name, file);
    });
});

module.exports = commands;