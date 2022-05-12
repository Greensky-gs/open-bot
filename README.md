# open-bot
This is an open source bot.

# Version
The version 13 of discord is required for this bot.

## Warning
The bot has french languages.
You can modify them in code files.

### Initialisation
(in french)

# Configuration
**important**

Le fichier `config.json` doit être remplit de cette manière :
```json
{
  "name": "Le nom de votre bot (il sera mis automatiquement en tant que nom d'utilisateur)",
  "pfp": "Le lien de la photo de profil de votre bot (optionnel)",
  "token": "Le token de votre bot",
  "prefix": "Le préfixe du bot",
  "statut": "Message affiché en statut du bot",
  "status": "PLAYING ou WATCHING ou STREAMING ou LISTENING",
  "disponible_status": ["PLAYING", "WATCHING", "STREAMING", "LISTENING", "Ceci sont les statut disponibles"],
  "replyToMention": true
}
```

Note : `replyToMention` peut être configuré sur `false` si le bot ne doit pas répondre lorsqu'on le mentionne.

# Modules
Le repertoire ne contient pas de dossier `node_modules`.

Sur un hébergeur, la création de ce dossier se fait automatiquement au démarrage, vous pouvez passer à l'étape suivante.
Si vous voulez l'installer en local, suivez ces étapes :

1. Ouvrez un invite de commande (cmd). ( windows + r, taper `cmd` et entrer ).
2. Positionnez-vous sur le dossier du bot ( `cd downloads/open-bot` ) **Après extraction des fichiers**
3. Tapez `npm install`

Si vous rencontrez un problème, contactez moi sur [ce serveur](https://discord.gg/Qt9Ns3uvYe)

# Erreurs
Si vous rencontrez une erreur, contactez sur [ce serveur](https://discord.gg/Qt9Ns3uvYe).
