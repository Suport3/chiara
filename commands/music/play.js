"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const color = require('../../colors.json');
module.exports = {
    name: "play",
    description: "Play music from Youtube",
    category: "Music",
    usage: "j!play (link/keyword)",
    aliases: ['p'],
    delete: true,
    execute: async function (client, message, args, ops) {
        const voiceChannel = message.member.voice.channel;
        const botVoiceChannel = message.guild.me.voice.channel;
        let data = ops.active.get(message.guild.id) || {};
        if (!args[0]) {
            let embed = new discord_js_1.MessageEmbed()
                .setColor(color.red)
                .setDescription(`Usage: ${this.usage}`);
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
        if (!message.guild.me.hasPermission("CONNECT")) {
            let embed = new discord_js_1.MessageEmbed()
                .setColor(color.red)
                .setDescription("Please allow me to connect to voice channel");
            message.channel.send(embed);
            return;
        }
        if (!message.guild.me.hasPermission("SPEAK")) {
            let embed = new discord_js_1.MessageEmbed()
                .setColor(color.red)
                .setDescription("Please allow me to speak in voice channel");
            message.channel.send(embed);
            return;
        }
        const isURL = ytdl_core_1.default.validateURL(args[0]);
        if (!botVoiceChannel) {
            voiceChannel.join();
        }
        else if (voiceChannel != botVoiceChannel) {
            let embed = new discord_js_1.MessageEmbed()
                .setColor(color.red)
                .setDescription("I'm currently playing music in a different voice channel");
            message.channel.send(embed);
            return;
        }
        if (!isURL) {
            const searchCommand = require('./search.js');
            searchCommand.execute(client, message, args, ops);
            return;
        }
        if (!data.connection)
            data.connection = await voiceChannel.join();
        if (!data.queue)
            data.queue = [];
        data.guildID = message.guild.id;
        const videoInfo = await ytdl_core_1.default.getInfo(args[0]);
        data.queue.push({
            songName: videoInfo.title,
            requester: message.author.tag,
            url: videoInfo.video_url,
            duration: videoInfo.length_seconds,
            announceChannel: message.channel.id,
            loop: false,
        });
        async function finish(client, ops, data) {
            const fetched = ops.active.get(data.dispatcher.guildID);
            if (fetched.queue.loop) {
                fetched.queue.unshift(fetched.queue[0]);
                fetched.queue.shift();
                await play(client, ops, fetched);
            }
            else {
                fetched.queue.shift();
                if (fetched.queue.length > 0) {
                    ops.active.set(data.dispatcher.guildID, fetched);
                    await play(client, ops, fetched);
                }
                else {
                    ops.active.delete(data.dispatcher.guildID);
                    let leaveCommand = require('./leave');
                    leaveCommand.execute(client, message, args, ops);
                }
            }
        }
        async function play(client, ops, data) {
            let embed = new discord_js_1.MessageEmbed()
                .setColor(color.green)
                .setDescription(`Now Playing: **${data.queue[0].songName}** || Requested by: **${data.queue[0].requester}**`);
            await message.channel.send(embed);
            data.dispatcher = await data.connection.play(ytdl_core_1.default(data.queue[0].url, { filter: "audioonly", quality: "highestaudio" }));
            data.dispatcher.guildID = data.guildID;
            data.dispatcher.on('finish', function () {
                finish(client, ops, data);
            });
        }
        if (!data.dispatcher) {
            await play(client, ops, data);
        }
        else {
            let embed = new discord_js_1.MessageEmbed()
                .setColor(color.green)
                .setDescription(`Added to queue: **${videoInfo.title}** || Requested by: **${message.author.tag}**`);
            await message.channel.send(embed);
        }
        ops.active.set(message.guild.id, data);
    }
};
