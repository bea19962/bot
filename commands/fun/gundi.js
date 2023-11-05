const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gundi')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    return interaction.reply('Gundolf!');
  },
};
