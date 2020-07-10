"use strict";
module.exports = (client) => {
    console.log(`${client.user.tag} is ready`);
    client.user.setPresence({
        activity: {
            name: `Prefix: ${process.env.PREFIX}`
        }, status: "dnd"
    });
};
