module.exports = {
	name: 'resume',
	description: 'Resume the current song',
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
      
        if (serverQueue.songs.length == 0)
        {
            return message.channel.send("There is no song to resume");
        }
            
        serverQueue.connection.dispatcher.resume();
    } 
};