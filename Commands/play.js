module.exports = {
    name: 'play',
    description: 'Joins and plays a video from youtube',
    args: true,
    serverQueues: new Map(),
    async execute(message, args) {

        const ytdl = require('ytdl-core');
        let serverQueue = module.exports.serverQueues.get(message.guild.id);
        const voiceChannel = message.member.voice.channel;
    
        if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissins');
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissins');
        if (!args.length) return message.channel.send('You need to send the second argument!');
    
        function validURL(str) {
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if (!regex.test(str)) {
                return false;
            } else {
                return true;
            }
        }
    
        if(validURL(args[0]))
        {
            const songInfo = await ytdl.getInfo(args[0]);
            const song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                channel: voiceChannel,
            };
            
            

            if (!serverQueue) 
            {       
                console.log("No queue found, adding to map");
                const queueInfo = {
                    connection: null,
                    songs: [],
                }
            
                module.exports.serverQueues.set(message.guild.id, queueInfo);
                serverQueue = module.exports.serverQueues.get(message.guild.id);
                serverQueue.songs.push(song);

                try 
                {
                    // Here we try to join the voicechat and save our connection into our object.
                    var connection = await voiceChannel.join();
                    serverQueue.connection = connection;
                    // Calling the play function to start a song
                    play(serverQueue.connection, serverQueue.songs[0]);
                } catch (err) {
                    // Printing the error message if the bot fails to join the voicechat
                    console.log(err);
                    module.exports.serverQueues.serverQueues.delete(message.guild.id);
                    return message.channel.send(err);
                }      
            }
            else 
            {
                console.log("Queue size: ",serverQueue.songs.length);
                if(!serverQueue.songs[0])
                {
                    serverQueue.songs.push(song);
                    play(serverQueue.connection, serverQueue.songs[0]);
                }
                else
                {
                    serverQueue.songs.push(song);
                    return message.channel.send(`${song.title} has been added to the queue!`);
                }

            }

            
            function play(guild, song) {
                if (!song) 
                {
                    module.exports.serverQueues.delete(message.guild.id);
                    voiceChannel.leave();
                    return;
                }

                const dispatcher = serverQueue.connection
                .play(ytdl(song.url),{seek: 0, volume: 1})
                .on("finish", () => {
                    if(serverQueue.songs.length == 1) 
                    {
                        serverQueue.songs.pop();
                    }
                    else
                    {
                        serverQueue.songs.shift();
                    }
                    play(guild, serverQueue.songs[0]);
                })
                .on("error", error => console.error(error));
                //dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);     
                message.reply(`:thumbsup: Now Playing ***${song.title}***`)
            }

    
            return
        }
        return
    }
}