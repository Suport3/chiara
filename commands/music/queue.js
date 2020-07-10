"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const color = require('../../colors.json');
module.exports = {
    name: "queue",
    description: "Shows the queue",
    category: "Music",
    usage: "j!queue",
    aliases: ['q'],
    delete: true,
    execute(client, message, args, ops) {
        const fetched = ops.active.get(message.guild.id);
        const voiceChannel = message.member.voice.channel;
        const botVoiceChannel = message.guild.me.voice.channel;
        if (!fetched) {
            let embed = new discord_js_1.MessageEmbed()
                .setColor(color.red)
                .setDescription("Queue is empty!");
            message.channel.send(embed);
            return;
        }
        if (!voiceChannel) {
            let embed = new discord_js_1.MessageEmbed()
                .setColor(color.red)
                .setDescription("You must be connected to a voice channel first in order to use the command");
            message.channel.send(embed);
            return;
        }
        if (!botVoiceChannel) {
            let embed = new discord_js_1.MessageEmbed()
                .setColor(color.red)
                .setDescription("I'm not connected to any voice channel");
            message.channel.send(embed);
            return;
        }
        if (voiceChannel != botVoiceChannel) {
            let embed = new discord_js_1.MessageEmbed()
                .setColor(color.red)
                .setDescription("I'm currently playing music in a different voice channel");
            message.channel.send(embed);
            return;
        }
        const queue = fetched.queue;
        const nowPlaying = queue[0];
        let emoji;
        if (fetched.dispatcher.paused) {
            emoji = "⏸";
        }
        else {
            emoji = "▶";
        }
        let response = new discord_js_1.MessageEmbed()
            .setColor(color.yellow)
            .setTitle("Queue")
            .setDescription(`${emoji} **${nowPlaying.songName}** || Requested by: **${nowPlaying.requester}**`);
        for (let i = 1; i < queue.length; i++) {
            response.addField(`${i}) **${queue[i].songName}**`, `Requested by: **${queue[i].requester}**`);
        }
        message.channel.send(response);
    }
};
