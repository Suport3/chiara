"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const ascii_table_1 = __importDefault(require("ascii-table"));
const fs_1 = require("fs");
const table = new ascii_table_1.default("Commands");
table.setHeading("Commands", "Load Status");
module.exports = (client) => {
    console.log("Checking Commands");
    fs_1.readdirSync(`./commands/`).forEach(dir => {
        const command = fs_1.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for (let file of command) {
            let pull = require(`../commands/${dir}/${file}`);
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            }
            else {
                table.addRow(file, `❌`);
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases))
                pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
        }
    });
    console.log(table.toString());
};
