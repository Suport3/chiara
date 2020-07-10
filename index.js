"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
require('dotenv').config();
const client = new discord_js_1.Client();
const token = process.env.TOKEN;
// @ts-ignore
client.commands = new discord_js_1.Collection();
// @ts-ignore
client.aliases = new discord_js_1.Collection();
['command', 'event'].forEach(handler => {
    require(`./utils/${handler}`)(client);
});
client.login(token);
