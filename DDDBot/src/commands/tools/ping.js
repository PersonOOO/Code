const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Return the ping"),
    async execute(interaction, client){
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `API Latency ${client.ws.ping}`;
        await interaction.editReply({
            content: newMessage
        });
    }
}