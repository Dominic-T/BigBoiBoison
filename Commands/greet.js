module.exports = {
	name: 'greet',
    description: 'Say hello to someone',
    args: true,
    execute(message, args) 
    {
        if (message.mentions.users.size > 0) {
            const mentionsList = message.mentions.users.map(user => {
                return `Hello there, ${user}`;
            });
            message.channel.send(mentionsList);
        }
	},
};