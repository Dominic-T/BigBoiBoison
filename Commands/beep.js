module.exports = {
	name: 'beep',
	description: 'You beep, I boop!',
	args: false,
    execute(message, args) 
    {
		// Message handling goes here
		message.channel.send('Boop.');
	},
};