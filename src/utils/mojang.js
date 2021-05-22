const fetch = require('node-fetch');

module.exports = {
    getUUID: async (username) => {
        if(!username.match(/^[a-z0-9_]*$/i)) return Promise.reject(`${username} is an invalid username`);
        const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        if(response.status !== 200) return Promise.reject(`${username} does not exist`);
        return await response.json().then(json => json.id);
    },

    getSkin: async (username) => {
        if(!username.match(/^[a-z0-9_]*$/i)) return Promise.reject(`${username} is an invalid username`);
        const UUID = await module.exports.getUUID(username);
        const response = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${UUID}`);
        return await response.json()
        .then(json => JSON.parse(Buffer.from(json.properties[0].value, 'base64').toString('ascii')))
        .then(r=>r.textures.SKIN.url)
    },

    getUsername: async (playerUUID) => {
        if(!playerUUID.match(/[\d-]/i)) return Promise.reject(`Please submit a valid UUID`);
        const response = await fetch(`https://api.mojang.com/user/profiles/${playerUUID}/names`);
        return response.json().then(json => json[json.length - 1].name)
    },

    getNameHistory: async (player) => {
        let nameHistory = new Map();
        if(player.length <= 16){
            if(!player.match(/^[a-z0-9_]*$/i)) return Promise.reject(`${player} is an invalid username`);
            const UUID = await module.exports.getUUID(player);
            const response = await fetch(`https://api.mojang.com/user/profiles/${UUID}/names`);
            return await response.json().then(json =>{
                json.forEach(element => nameHistory.set(element.name, element.changedToAt ? Intl.DateTimeFormat('en-GB').format(new Date(element.changedToAt)) : "Original name"))
                console.log(nameHistory)
            });

        } else {
            if(!playerUUID.match(/[\d-]/i)) return Promise.reject(`Please submit a valid UUID`);
        }
    },
}

module.exports.getNameHistory("smarteOwl").then(p => {console.log(p)});

module.exports.getUUID()