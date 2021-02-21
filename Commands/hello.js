module.exports = {
	name: 'hello',
    description: "Announce a loud 'Hello there'",
    enabled: true,
    args: false,
    async execute(message, args) 
    {
        if(module.exports.enabled)
        {
            const voiceChannel = args[0];
            const ytdl = require('ytdl-core');
            //const stream  = ytdl("https://www.youtube.com/watch?v=XIHMZWd7X90", {filter: 'audioonly'});
            //if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');
            //const permissions = voiceChannel.permissionsFor(message.client.user);
            //if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissins');
            //if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissins');
    
            const connection = await voiceChannel.join();
    
            connection.play("./Audio/hello-there.mp3", {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
            });    
            return;
        }
        else
        {
            console.log("Auto greet is disabled");
        }

    }
};