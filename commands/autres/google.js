const { reply } = require('../../assets/functions');

module.exports = {
    help: {
        name: 'google',
        description: "Fait une recherche google",
        permissions: [],
        aliases: ['gsearch'],
        cooldown: 5
    },
    run: (message, args) => {
        let search = "https://wwww.google.fr/search?q=" + (args.join('+') || 'webdriver+torso');

        reply(message, search);
    }
};