const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v10');
const fs = require('fs');


module.exports = (client) =>
{
    client.handleCommands = async() =>{
        const commandFolder = fs.readdirSync('./src/commands');
        for(const folder of commandFolder){
            const commandFiles = fs 
            .readdirSync(`./src/commands/${folder}`)
            .filter((file) => file.endsWith(".js"));

        const {commands, commandArray} = client;
        for(const file of commandFiles)
        {
            const command = require(`../../commands/${folder}/${file}`)
            commands.set(command.data.name, command);
            commandArray.push(command.data.toJSON());
            console.log(`Command: ${command.data.name} passed`)
        }
    }
    const clientId = '1116564513920143360';
    const guildId = '1116559199527247894';    // REAL   SERVER
    const rest = new REST({version: '10'}).setToken(process.env.token);
    try {
        console.log("Start refresh");

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            {body: client.commandArray,}
        );

        console.log("Refresh succesful")
    } catch (error) {
        console.error(error);
    }
};
};