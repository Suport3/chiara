"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const youtube_search_1 = __importDefault(require("youtube-search"));
const color = require('../../colors.json');
module.exports = {
    name: 'search',
    description: "Search for videos on youtube",
    category: "Music",
    usage: "j!search (keyword)",
    delete: true,
    execute(client, message, args, ops) {
        const opts = {
            maxResults: 1,
            key: process.env.API_KEY
        };
        youtube_search_1.default(args.join(' '), opts, function (err, results) {
            let commandFile = require('./play.js');
            // @ts-ignore
            commandFile.execute(client, message, [results[0].link], ops);
        });
    }
};
