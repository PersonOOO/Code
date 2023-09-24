const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const cooldowns = new Discord.Collection();
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async message => {
	
	if (!message.content.startsWith(prefix) || message.author.bot)
		return;

	const args = message.content.slice(prefix.length).split(',');
	const commandName = args.shift().toLowerCase();

	if ((message.content.startsWith(`${prefix}die`))) {

		let hostdd = message.guild.channels.cache.find(category => category.name === "Hosting Games")

		if (!hostdd)
			hostdd = await message.guild.channels.create("Hosting Games", {
				type: 'category',
			})

		//if (!message.guild.roles.cache.find(role => role.name === "Ghosts"))
			

		const channelName = `${message.author.username} - is hosting !`

		//if (message.guild.channels.cache.find(channels => channels.id === 727213199908143157n)) {

		if ((message.guild.channels.cache.find(c => c.id === 727213199908143157n))) {
			return message.channel.send("You are already hosting an event!")
		}

		message.guild.channels.create(channelName, {
			parent: hostdd.id,
			topic: `Hoster: ${message.author.id}`
		}).then(c => {
			const everyone = message.guild.roles.cache.find(role => role.name === "@everyone")
			c.updateOverwrite(everyone, {
				SEND_MESSAGES: false,
				VIEW_CHANNEL: false,
			});
			c.updateOverwrite(message.author, {
				SEND_MESSAGES: true,
				VIEW_CHANNEL: true,
			});

		}).catch(console.error)

		console.log(message.guild.channels.cache.array())
	}

	if ((message.content.startsWith(`${prefix}test`)))
	{
		var total = 0;
		const amt = parseInt(args[1]);

		if (true) {
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
			message.channel.send(embed).then(sentMessage => {
				sentMessage.react('🟢');
				sentMessage.react('🟡');
				sentMessage.react('🔴');
			});
		}

		if (!(amt === 0 || isNaN(amt))) {

			client.on('messageReactionAdd', (reaction, user) => {
				if (reaction.emoji.name === '🟢' && !user.bot) {
					total = total + 1;
					console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
				}
				if (total > amt) {
					message.author.send('The channel is currently full...' + '\n' + 'Select 🟡 if you want to try later');
				}
				if (reaction.emoji.name === '🟡') {

				}
			});

		}//react after
	}

	if (true) {
		if (!client.commands.has(commandName))
			return;
		const command = client.commands.get(commandName);

		if (!cooldowns.has(command.name))
			cooldowns.set(command.name, new Discord.Collection());

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;
		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
			}
		}
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		try {
			command.execute(message, args);
		}
		catch (error) {
			console.error(error);
			message.reply('Somthing went wrong... please check your syntax');
		}
	}//cooldown

});


client.login(token);