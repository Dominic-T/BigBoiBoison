module.exports = {
	name: 'args-info',
    description: 'Display your arguments',
    args: true,
    execute(message, args) 
    {
        if (args[0] === 'foo') {
            return message.channel.send('bar');
        }  
        message.channel.send(`First argument: ${args[0]}`);        
          // Display arguments
        //message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	},
};