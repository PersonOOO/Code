const Discord = require('discord.js');
module.exports =
{
	/*name: 'host',
	description: 'Host a Game!',
	args: true,
	execute(message, args)
	{
		var total = 0;
		const amt = parseInt(args[1]);
		if (amt === 0 || isNaN(amt))
			count = 'All can play!';
		else
			count = 'Max player count: ' + amt;

		if (args[2] === '' || args[2] === args[300])
			args[2] = "It\'s a free for all!";
		const bibty = Math.floor(Math.random() * 254)
		const bobty = Math.floor(Math.random() * 254)
		const boo = Math.floor(Math.random() * 254)
		const embed = new Discord.MessageEmbed()
			.setColor([bibty, bobty, boo])
			.setTitle('')
			.setDescription('------------------------------------------------------')
			.setThumbnail(message.author.displayAvatarURL())
			.setAuthor('Game: ' + args[0], '', '')
			.addField('\u200b', '\u200b')
			.addField('Hoster: ' + message.author.username, count, true)
			.addField('Descreption:', args[2], true)
			.setTimestamp()
			.setFooter('React to join or decline');
		message.channel.send(embed);
		message.guild.channels.create(args[0], { type: 'voice' }), message.author.reply('Message sent!' + '\n' + 'Reply "!done" when the parties over!');
		setTimeout(function () {
			//message.guild.channels(channel => channel.delete())
		}, 7200000);

		if (!(amt === 0 || isNaN(amt))) {

			message.react('🟢');
			message.react('🟡');
			message.react('🔴');


			const filter = (reaction, user) => {
				return (reaction.emoji.name === '🟢' || reaction.emoji.name === '🟡' || reaction.emoji.name === '🔴') && !user.bot;
			};

			const collector = message.createReactionCollector(filter, { time: 15000 });

			collector.on('collect', (reaction, user) => {
				console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
				if (reaction.emoji.name === '🟢')
					total = total + 1;
				if (total > amt) {
					message.author.send('The channel is currently full...' + '\n' + 'Select 🟡 if you want to try later');
				}
				if (reaction.emoji.name === '🟡') {

				}
			});

			collector.on('end', collected => {
				console.log(`Collected ${collected.size} items`);
			});

		}
	},*/

};
