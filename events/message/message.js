"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const prefix = process.env.PREFIX;
const color = require('../../colors.json');
const active = new Map();
module.exports = async (client, message) => {
    if (message.author.bot)
        return;
    if (message.channel.type != 'text')
        return;
    if (!message.content.startsWith(prefix))
        return;
    const ops = {
        active: active
    };
    // @ts-ignore
    const args = message.content.slice(prefix.length).trim().split(/\s+/);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0)
        return;
    let command = client.commands.get(cmd);
    if (!command)
        command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        try {
            if (command.delete)
                message.delete();
            await command.execute(client, message, args, ops);
        }
        catch (err) {
            let embed = new discord_js_1.MessageEmbed()
                .setColor(color.red)
                .setDescription(err);
            message.channel.send(embed);
        }
    }
};
