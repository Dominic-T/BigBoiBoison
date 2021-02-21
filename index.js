const FileSys = require('fs'); // Local file system
const Discord = require('discord.js'); // Discord Client
const { prefix, token } = require('./config.json'); // Configurations for token and prefix

// create a new Discord client
const client = new Discord.Client();

// load files for commands
const CommandFiles = FileSys.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.commands = new Discord.Collection();

for (const file of CommandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Big boi boison is Ready!');
});

// login to Discord with your app's token
client.login(token);


/*console.log("Server 1");
serverQueues = client.commands.get("play").serverQueues;
console.log(client.guilds.cache);
for (guild of client.guilds.cache) {

    console.log(serverQueues);
}
console.log("Server 3");*/

client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.channel;
    let oldUserChannel = oldMember.channel;
    if(oldUserChannel === null && newUserChannel !== null) 
    {
        const tmpcommand = client.commands.get("hello");
        const arr = [newUserChannel];
        tmpcommand.execute("hello", arr);   
    }
});


// Handle commands 
client.on('message', message => 
{
    //Only process the message if the prefix is applied
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Split the message into command and an array of arguments split by whitespace
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const CommandName = args.shift().toLowerCase();

    // Special command behaviour
    if(CommandName === "auto-greet") {
        const tmpcmd= client.commands.get("hello");
        if(args[0] === "on") {
            tmpcmd.enabled = true;
            message.channel.send("Auto greet enabled");
        } else if(args[0] === "off") {
            tmpcmd.enabled = false;
            message.channel.send("Auto greet disabled");
        } else {
            return message.channel.send(`Only type 'On' or 'Off'`);  }
    }

    // Do not process the command if it is not defined
    if (!client.commands.has(CommandName)) return;

    // Command exists and can be used
    const command = client.commands.get(CommandName);
    
    // If a command requires arguments then check they exist
    if (command.args && !args.length) 
    {
        return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }

    // Attempt to execute the command
    try 
    {
        command.execute(message, args);      
    } 
    catch (error) 
    {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});