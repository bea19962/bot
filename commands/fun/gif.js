require('dotenv').config();
const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');

const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
const GIPHY_API_URL = process.env.GIPHY_API_URL;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gif')
    .setDescription('Get a random GIF from Giphy'),

  async execute(interaction) {
    try {
      const response = await axios.get(GIPHY_API_URL, {
        params: {
          api_key: GIPHY_API_KEY,
          tag: 'cool',
          rating: 'pg',
        },
      });

      if (response.data.data.length === 0) {
        throw new Error('Giphy returned no results.');
      }

      const gifUrl = response.data.data.images.original.url;
      return interaction.reply(gifUrl);
    } catch (error) {
      console.error('Error fetching GIF from GIPHY:', error);
      await interaction.reply({
        content: "Couldn't fetch a GIF at the moment.",
        ephemeral: true,
      });
    }
  },
};
