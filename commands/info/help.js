"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const color = require('../../colors.json');
const prefix = process.env.PREFIX;
module.exports = {
    name: "help",
    description: "Shows all the commands",
    category: "Info",
    usage: "j!help",
    delete: true,
    execute(client, message, args) {
        const { commands } = message.client;
        const cmdList = commands.filter((cmdName) => cmdName.name != "help").map((command) => command.name).join('`, `');
        let embed = new discord_js_1.MessageEmbed()
            .setColor(color.cyan)
            .setTitle(`Commands List`)
            .setDescription(`\`${cmdList}\``)
            .setFooter(`Prefix: ${prefix}`);
        message.author.send(embed)
            .then(() => {
            if (message.channel.type != 'text')
                return;
            let resp = new discord_js_1.MessageEmbed()
                .setColor(color.green)
                .setDescription("I've sent you all my commands!");
            message.channel.send(resp);
        })
            .catch((err) => {
            let resp = new discord_js_1.MessageEmbed()
                .setColor(color.red)
                .setDescription("I can't send you the commands list. Please check if you have `Allow direct messages from server members` enabled!");
            message.channel.send(resp);
        });
    }
};
