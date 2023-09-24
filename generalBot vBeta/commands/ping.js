const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
module.exports = {

	name: 'ping',
	cooldown: 5,
	description: 'Ping!',
	execute(message, args) {

		var userTickets = new Map();
		message.guild.channels.create(args[0], {
			type: 'text',
			userLimit: args[1],
		}).then(ch => {
			userTickets.set(message.author.id, ch.id);
		}).catch(err => console.log(err));


		console.log(userTickets)
		client.users.cache.find(user => user.username === 'Bob');
	}
};



