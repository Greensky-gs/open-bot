const { Client, Intents } = require('discord.js');
const { token } = require('./assets/data/config.json');
const { readdirSync } = require('fs');

const client = new Client({
    partials: ['MESSAGE', 'GUILD_MEMBER', 'CHANNEL', 'REACTION', 'USER'],
    intents: Object.keys(Intents.FLAGS)
});

readdirSync('./events').filter(x => x.endsWith('.js')).forEach((fileName) => {
    let props = require(`./events/${fileName}`);

    client.on(props.event, props.execute);
});

client.login(token).catch(e => {
    throw e
});