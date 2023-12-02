require('dotenv').config();
const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');

const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
const GIPHY_API_URL = process.env.GIPHY_API_URL;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gif')
    .setDescription('Get a random GIF from Giphy')
    .addStringOption(option =>
      option
        .setName('category')
        .setDescription('The gif category')
        .setRequired(true)
        .addChoices(
          { name: 'AAAA', value: 'aaaa' },
          { name: 'Bird', value: 'bird' },
          { name: 'Bear', value: 'bear' },
          { name: 'Capybara', value: 'Capybara' },
          { name: 'Crab', value: 'crab' },
          { name: 'Cool Crustacean', value: 'crustacean' },
          { name: 'Cute Cat', value: 'cat' },
          { name: 'Cute Dog', value: 'dog' },
          { name: 'Dank', value: 'dank memes' },
          { name: 'Silly Goose', value: 'Animals goose' },
        ),
    ),

  async execute(interaction) {
    const category = interaction.options.getString('category');
    const rating = 'g';

    try {
      const response = await axios.get(GIPHY_API_URL, {
        params: {
          api_key: GIPHY_API_KEY,
          tag: category,
          rating: rating,
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
