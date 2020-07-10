"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const color = require('../../colors.json');
module.exports = {
    name: "volume",
    description: "Sets the volume of the song",
    category: "Music",
    usage: "j!volume (1-200)",
    aliases: ['vol'],
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
        if (isNaN(args[0]) || args[0] > 200 || args[0] < 0 || !args[0]) {
            let embed = new discord_js_1.MessageEmbed()
                .setColor(color.red)
                .setDescription("Please enter a number which is greater than `0` and lower than or equals `200`!");
            message.channel.send(embed);
            return;
        }
        fetched.dispatcher.setVolume(args[0] / 100);
        let embed = new discord_js_1.MessageEmbed()
            .setColor(color.green)
            .setDescription(`Set the volume at: ${args[0]}%!`);
        message.channel.send(embed);
    }
};
