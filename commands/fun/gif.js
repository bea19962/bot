// commands/gibGIF.js
const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');

const GIPHY_API_URL = "https://api.giphy.com/v1/gifs/random";
const GIPHY_API_KEY = "Yt333mUFtGiFelxW8NBTwlW6VxCLDoR9e"; 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gif')
        .setDescription('Get a random GIF from Giphy'),

    async execute(interaction) {
        try {
            const response = await axios.get(GIPHY_API_URL, {
                params: {
                    api_key: GIPHY_API_KEY,
                    rating: 'pg'  // Ensures the GIF is safe-for-work
                }
            });

            const gifUrl = response.data.data.image_url;

            await interaction.reply({ content: gifUrl });
        } catch (error) {
            console.error("Error fetching GIF from GIPHY:", error);
            await interaction.reply({ content: "Couldn't fetch a GIF at the moment.", ephemeral: true });
        }
    }
};
