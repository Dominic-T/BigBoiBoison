module.exports = {
	name: 'skip',
	description: 'Skip to the next song in the queue',
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
            return message.channel.send("There is no song that I could skip!");
        }
            
        serverQueue.connection.dispatcher.end();

        if(serverQueue.songs.length == 1)
        {
            //serverQueue.songs.pop();
        }
    } 
};