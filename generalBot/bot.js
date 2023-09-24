
/*fs.readdir(path.join(__dirname, 'events'))
	.then(files => {
		files.forEach(file => {
			if (!file.endsWith(".js")) return;
			let eventName = file.substring(0, file.indexOf('.js'));
			let eventModule = require(path.join(__dirname, 'events', eventName));

			client.on(eventName, eventModule.bind(null, client));
		})
	}).catch(err => console.log(err))

fs.readdir(path.join(__dirname, 'commands'))
	.then(files => {
		files.forEach(file => {
			if (!file.endsWith(".js")) return;
			let cmdName = file.substring(0, file.indexOf('.js'));
			let cmdModule = require(path.join(__dirname, 'commands', cmdName));
			client.commands.set(cmdName, cmdModule);
		});
	}).catch(err => console.log(err))*/

/*
 * Database commmands:
 * use discordData
 * select * from x
 * delete from x
 * describe x
*/

require('dotenv').config();
const { Client } = require('discord.js')
const client = new Client({ partials: ['MESSAGE', 'REACTION'] });
const db = require('./database')
const Ticket = require('./models/Ticket');
const TicketConfig = require('./models/TicketConfig');
const fs = require('fs').promises


client.once('ready', () => {
	console.log('Ready!');
	db.authenticate().then(() => {
		console.log('Conected to DB')
		Ticket.init(db);
		TicketConfig.init(db);
		Ticket.sync();
		TicketConfig.sync();
	}).catch((err) => console.log(err));
});

//message id is the channel in which host messages eneter
client.on('message', async (message) => {

	if (message.author.bot)
		return true;


	if (message.content === '!setup' && message.guild.ownerID === message.author.id) {
		try {
			const filter = (m) => m.author.id === message.author.id;
			message.channel.send('Enter the channel id that host messages will enter')
			const chnId = (await message.channel.awaitMessages(filter, { max: 1 })).first().content;
			const getChn = client.channels.cache.get(chnId);
			message.channel.send('Now, enter the category id for host channels')
			const categoryId = (await message.channel.awaitMessages(filter, { max: 1 })).first().content;
			const categoryChannel = client.channels.cache.get(categoryId);
			message.channel.send('Please enter the role ids that can see all host sessions');
			const roles = (await message.channel.awaitMessages(filter, { max: 1 })).first().content.split(/,\s*/);
			if (getChn && categoryChannel) {
				for (const roleId of roles)
					if (!message.guild.roles.cache.get(roleId)) throw new Error('Role does not exist');

				const ticketConfig = await TicketConfig.create({
					messageId: chnId,
					guildId: message.guild.id,
					roles: JSON.stringify(roles),
					parentId: categoryChannel.id
				});
				message.channel.send('Your configuration has been succesfully saved!')


			} else throw new Error('Invalid fields')

		} catch (err) {
			console.log(err);
			message.channel.send('You did not send a valid id!')
		}
	}

	if (message.content === '!host') {
		const ticketConfig = await TicketConfig.findOne({ where: { guildId: message.guild.id } });
		if (ticketConfig) {
			const findTicket = await Ticket.findOne({ where: { authorId: message.author.id, resolved: false } })
			if (findTicket) message.author.send('You already have a ticket!');
			else {
				console.log('Cretaing ticket');
				try {
					const roleIdsString = ticketConfig.getDataValue('roles');
					console.log(roleIdsString)
					const rolesIds = JSON.parse(roleIdsString);
					const permissions = rolesIds.map((id) => ({ allow: 'VIEW_CHANNEL', id }));
					const channel = await message.guild.channels.create('ticket', {
						type: 'voice',
						parent: ticketConfig.getDataValue('parentId'),
						permissionOverwrites: [
							{ deny: 'VIEW_CHANNEL', id: message.guild.id },
							{ allow: 'VIEW_CHANNEL', id: message.author.id },
							...permissions
						]
					});

					const msg = await message.author.send('Use !close to stop hosting!')

					const ticket = await Ticket.create({
						authorId: message.author.id,
						channelId: channel.id,
						guildId: message.guild.id,
						resolved: false,
						closedMessageId: msg.id
					})

					const ticketId = String(ticket.getDataValue('ticketId')).padStart(4, 0);
					await channel.edit({ name: `${message.author.username} is hosting!` });

				} catch (err) {
					console.log(err);
				}
			}

		} else {
			console.log('no ticket config found');
		}

	}

	if (message.content === '!close') {
		const ticket = await Ticket.findOne({ where: { authorId: message.author.id } && {resolved: false } })
		if (ticket) {
			const channelID = ticket.getDataValue('channelId')
			const chann = message.guild.channels.cache.get(channelID);
			chann.delete().catch(err => {
				console.error(err);
			});

			ticket.resolved = true;
			await ticket.save();
			console.log('Updated');
		}
	}


});


client.on('messageReactionAdd', async (reaction, user) => {
	if (user.bot) return;
	if (reaction.emoji.name === '🟢') {

	}
});

client.login(process.env.TOKEN)