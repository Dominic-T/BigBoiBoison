module.exports = {
	name: 'stop',
	description: 'Stop playing music',
	args: false,
    execute(message, args)
    {
        const serverQueue = message.client.commands.get("play").serverQueues.get(message.guild.id)
        //serverQueues.get(message.guild.id);
        const voiceChannel = message.member.voice.channel;
        
        if (!voiceChannel) 
        {
            return message.channel.send(
            "You have to be in a voice channel to stop the music!"
            );
        }
      
        if (!serverQueue.songs[0])
        {
            return message.channel.send("There is no song that I could stop!");
        }
            
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    } 


};