"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const color = require('../../colors.json');
module.exports = {
    name: "leave",
    description: "Leave the voice channel",
    category: "Music",
    usage: "j!leave",
    delete: true,
    execute(client, message, args, ops) {
        const fetched = ops.active.get(message.guild.id);
        const voiceChannel = message.member.voice.channel;
        const botVoiceChannel = message.guild.me.voice.channel;
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
        let embed = new discord_js_1.MessageEmbed()
            .setColor(color.green)
            .setDescription("✅ Left the voice channel!");
        if (!fetched) {
            voiceChannel.leave();
            message.channel.send(embed);
        }
        else {
            embed.setDescription("✅ Deleted the queue and left the voice channel");
            ops.active.delete(message.guild.id);
            voiceChannel.leave();
            message.channel.send(embed);
        }
    }
};
