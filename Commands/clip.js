module.exports = {
	name: 'clip',
    description: "Play an audio clip'",
    args: true,
    async execute(message, args) 
    {
        const voiceChannel = message.member.voice.channel;
        //const ytdl = require('ytdl-core');
        //const stream  = ytdl(" ", {filter: 'audioonly'});
        if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissions');
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissions');

        const connection = await voiceChannel.join();

        switch(args[1])
        {
            case "money":
                connection.play("./Audio/Cash Money.mp3", {seek: 0, volume: 1})
                .on('finish', () =>{
                    voiceChannel.leave();
                });  
                break;
            case "north":
                break;
            case "shovel":
                break;
            case "helmsdeep":
                break;
            case "ents":
                break; 
        };
        return;
    }
};