const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const path = require('path');
const { clientId, guildId, token } = require('./config.json');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith('.js'));

// Place your command data gathering here
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    // Register commands for each guild ID
    for (const guild of guildId) {
      await rest.put(Routes.applicationGuildCommands(clientId, guild), {
        body: commands,
      });

      console.log(
        `Successfully reloaded application (/) commands for guild ${guild}.`,
      );
    }

    console.log('Successfully reloaded all application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
