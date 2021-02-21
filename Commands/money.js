module.exports = {
	name: 'money',
    description: "Cash, Hoes, Bitches, Money'",
    args: false,
    async execute(message, args) 
    {
        const voiceChannel = message.member.voice.channel;
        const ytdl = require('ytdl-core');
        //const stream  = ytdl(" ", {filter: 'audioonly'});
        if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissins');
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissins');

        const connection = await voiceChannel.join();

        connection.play("./Audio/Cash Money.mp3", {seek: 0, volume: 1})
        .on('finish', () =>{
            voiceChannel.leave();
        });    

        return;
    }
};