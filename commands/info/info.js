"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
// @ts-ignore
const common_tags_1 = require("common-tags");
const color = require('../../colors.json');
module.exports = {
    name: "info",
    description: "Shows the bot's information",
    category: "Info",
    usage: 'j!info',
    aliases: ['bot', 'botinfo'],
    delete: true,
    execute(client, message, args, ops) {
        let platform;
        if (process.platform === "win32") {
            platform = "Windows";
        }
        else if (process.platform === "linux") {
            platform = "Linux";
        }
        else if (process.platform === "aix") {
            platform = "IBM AIX";
        }
        else if (process.platform === "darwin") {
            platform = "Darwin";
        }
        else if (process.platform === "openbsd") {
            platform = "OpenBSD";
        }
        else if (process.platform === "sunos") {
            platform = "SunOS";
        }
        let usedMemory = process.memoryUsage().heapUsed / 1024 / 1024;
        let usedCPU = process.cpuUsage().user / process.cpuUsage().system;
        let embed = new discord_js_1.MessageEmbed()
            .setColor(color.aqua)
            .setDescription(common_tags_1.stripIndents `
            \`\`\`
        Used Memory: ${Math.round(usedMemory * 100) / 100}MB
        CPU Usage: ${Math.round(usedCPU)}%
        OS Running On: ${platform}
        Library: discord.js@12.2.0
            \`\`\``)
            .setFooter(`Developed by JustAPie#2670`);
        message.channel.send(embed);
    }
};
