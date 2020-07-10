"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const color = require('../../colors.json');
module.exports = {
    name: "clear",
    description: "Clears the queue",
    category: 'Music',
    usage: 'j!clear',
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
        ops.active.delete(message.guild.id);
        fetched.dispatcher.emit('finish');
        let embed = new discord_js_1.MessageEmbed()
            .setColor(color.green)
            .setDescription("Queue cleared");
        message.channel.send(embed);
    }
};
