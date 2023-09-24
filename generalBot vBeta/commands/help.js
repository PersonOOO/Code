module.exports = {
	name: 'help',
	cooldown: 5,
	description: 'Help!',
	execute(message, args) {
		message.author.send('Here are a list of my commands, and what they do:' + '\n' + '!prune #: deletes # amount of messages' + '\n' + '!ping: I return pong.');
	},
};