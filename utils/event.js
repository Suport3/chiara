"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const ascii_table_1 = __importDefault(require("ascii-table"));
const fs_1 = require("fs");
const table = new ascii_table_1.default("Events");
table.setHeading("Events", "Load Status");
module.exports = (client) => {
    console.log("Checking Events");
    fs_1.readdirSync('./events/').forEach(dir => {
        const event = fs_1.readdirSync(`./events/${dir}/`).filter(file => file.endsWith('.js'));
        for (let file of event) {
            let event = require(`../events/${dir}/${file}`);
            let name = file.split(".")[0];
            if (name) {
                table.addRow(file, '✅');
                client.on(name, event.bind(null, client));
            }
            else {
                table.addRow(file, `❌`);
            }
        }
    });
    console.log(table.toString());
};
