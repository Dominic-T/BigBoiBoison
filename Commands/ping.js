module.exports = {
	name: 'ping',
	description: 'Ping me!',
	args: false,
    execute(message, args) 
    {
		// Message handling goes here
		message.channel.send('Pong.');
	},
};