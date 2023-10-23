const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');

//const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/search';
const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/random?api_key=t333mUFtGiFelxW8NBTwlW6VxCLDoR9e&tag=burrito&rating=pg';
//onst GIPHY_API_KEY = 't333mUFtGiFelxW8NBTwlW6VxCLDoR9e';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gif')
    .setDescription('Get a random GIF from Giphy'),

  async execute(interaction) {
    try {
      const response = await axios.get(GIPHY_API_URL, {
        // params: {
        //   api_key: GIPHY_API_KEY,
        //   tag: 'cool',
        //   rating: 'pg',
        // },
      });

      console.log('response', response.data.data);
      console.log('res', response);

      if (response.data.data.length === 0) {
        throw new Error('Giphy returned no results.');
      }

      // const gifUrl = response.data.data.images.original.url;
      const gifUrl = response.data;
      console.log('gif', response.data.data.images.original.url);

      await interaction.reply( gifUrl
      //  {
      //   embeds: [
      //     {
      //       image: {
      //         url: gifUrl,
      //       },
      //     },
      //   ],
      // }
      );
    } catch (error) {
      console.error('Error fetching GIF from GIPHY:', error);
      await interaction.reply({
        content: "Couldn't fetch a GIF at the moment.",
        ephemeral: true,
      });
    }
  },
};
