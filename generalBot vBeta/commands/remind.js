const Discord = require('discord.js');
module.exports = {
	name: 'remind',
	cooldown: 5,
	description: 'Dms the user as a reminder!',
	execute(message, args) {
		const remEmbed = new Discord.MessageEmbed()
			.setColor([0, 200, 150])
			.setTitle('')
			.setDescription(args[0] + '\n' + '_')
			.setAuthor('You wanted me to remind you: ', '', '')
			//.addField('\u200b', '\u200b', true)
			.addField('You asked me:					', args[1] + ' minutes ago')

		setTimeout(function () {
			message.author.send(remEmbed);
		}, args[1] * 60000);


		
	},

};