module.exports = {
	name: 'harru',
	description: 'F in chat for Harru',
	args: false,
    execute(message, args) 
    {
		// Message handling goes here
		message.channel.send("He's dead, he's gone!");
	},
};