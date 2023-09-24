const {SlashCommandBuilder, EmbedBuilder, Embed} = require('discord.js');
const pickedUped = '✅';
const going = '❕';
const cancel = '❌';
const peopleAvailable = new Set();
let list = "";
let sampleEmbed;
let newEmbed;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('display')
        .setDescription("Presents the display and add reactions"),
    async execute(interaction, client){
        const embed = new EmbedBuilder()
            .setTitle(`A Delivery has been ordered by: `)
            .setDescription(`The address for pick up is at: \nReact if you are intrested in picking it up`)
            .addFields(
                { name: 'People who are going', value: 'none' },
                { name: '\u200B', value: '\u200B' },
                { name: `If you want to pick up`, value: `${going}`, inline: true },
                { name: `If you picked it up`, value: `${pickedUped}`, inline: true },
                { name: `If you do not want to pick up anymore`, value: `${cancel}`, inline: true },
                
            )
            //.setImage()
            //.setTimestamp()
            //.setURL()*/
            

        const message = await interaction.reply({
            embeds: [embed],
            fetchReply: true 
        
        });
        
        message.react(going)
        .then(() => message.react(pickedUped))
        .then(() => message.react(cancel))
        .catch(error => console.error('One of the emojis failed to react:', error));

        const collectionFilter = (reaction, user) =>{
            return (reaction.emoji.name == going ||reaction.emoji.name == pickedUped ||reaction.emoji.name == cancel) && !user.bot;
        };

        const collector = message.createReactionCollector({ filter: collectionFilter});
        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case going:
                    peopleAvailable.add(user);
                    sampleEmbed = message.embeds[0];
                    list = "";
                    for (const item of peopleAvailable) {
                        list += item.tag + '\n';
                    }
                    newEmbed = EmbedBuilder.from(sampleEmbed).setFields(
                        { name: 'People who are going', value: list },
                        { name: '\u200B', value: '\u200B' },
                        { name: `If you want to pick up`, value: `${going}`, inline: true },
                        { name: `If you picked it up`, value: `${pickedUped}`, inline: true },
                        { name: `If you do not want to pick up anymore`, value: `${cancel}`, inline: true },
                    )
                    message.edit({ embeds: [newEmbed] });
                    break;
                case pickedUped:
                    if(!peopleAvailable.has(user))
                    {
                       user.send("You were not part of the list that said you were going to pick it up. React that you are going to pick it up first")
                        
                    }
                    else{
                        sampleEmbed = new EmbedBuilder()
                        .setTitle('Donation picked up')
                        .setDescription('it has been closed');
                    message.edit({ embeds: [sampleEmbed] });
                    message.delete();
                    }
                    
                    break;
                case cancel:
                    peopleAvailable.delete(user);
                    sampleEmbed = message.embeds[0];
                    if (peopleAvailable.size != 0)
                    {
                        list = "";
                        for (const item of peopleAvailable) {
                            list += item.tag + '\n';
                        }
                        newEmbed = EmbedBuilder.from(sampleEmbed).setFields(
                            { name: 'People who are going', value: list },
                            { name: '\u200B', value: '\u200B' },
                            { name: `If you want to pick up`, value: `${going}`, inline: true },
                            { name: `If you picked it up`, value: `${pickedUped}`, inline: true },
                            { name: `If you do not want to pick up anymore`, value: `${cancel}`, inline: true },
                        )
                    }
                    else{
                        newEmbed = EmbedBuilder.from(sampleEmbed).setFields(
                            { name: 'People who are going', value: "none" },
                            { name: '\u200B', value: '\u200B' },
                            { name: `If you want to pick up`, value: `${going}`, inline: true },
                            { name: `If you picked it up`, value: `${pickedUped}`, inline: true },
                            { name: `If you do not want to pick up anymore`, value: `${cancel}`, inline: true },
                        )
                    }
                    message.edit({ embeds: [newEmbed] });
                   
                    break;
            }
            //console.log(`Collected ${reaction.emoji.name} from ${user.tag}  `);
        });
    },
};