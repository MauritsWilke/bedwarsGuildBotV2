require('dotenv').config()
const fetch = require('node-fetch');
const mcApi = require('./mojang.js');

const BASE_KEY = "https://api.hypixel.net"

let uuidCache = {};
let flCache = {};
let playerGuildCache = {};

module.exports = {
    keyInfo: async () => {
        const response = await fetch(`${BASE_KEY}/key?&key=${process.env.HYPIXEL_API_KEY}`);
        if (response.status !== 200) return Promise.reject(`${response.status} ${response.statusText}`);
        const r = await response.json();
        return r.record;
    },

    playerStats: async (player, gamemode) => {
        if (!player) return Promise.reject(`This function requires an input`);
        let UUID = uuidCache[player] || await mcApi.getUUID(player).then(r => {
            uuidCache[player] = r;
            setTimeout(() => { delete uuidCache[player] }, 15 * 60000)
            return r;
        });
        const response = await fetch(`${BASE_KEY}/player?uuid=${UUID}&key=${process.env.HYPIXEL_API_KEY}`);
        if (response.status !== 200) return Promise.reject(`${response.status} ${response.statusText}`);
        const json = await response.json();
        return gamemode ? json.player.stats[gamemode] : json.player;
    },

    friendList: (player) => {
        if (!player) return Promise.reject(`This function requires an input`);
            async function getFriendList(){
                let friendList = new Map()
                let UUID = uuidCache[player] || await mcApi.getUUID(player).then(r => {
                    uuidCache[player] = r;
                    setTimeout(() => { delete uuidCache[player] }, 10 * 60000)
                    return r;
                });
                const response = await fetch(`${BASE_KEY}/friends?uuid=${UUID}&key=${process.env.HYPIXEL_API_KEY}`);
                if (response.status !== 200) return Promise.reject(`${response.status} ${response.statusText}`);
                const { records } = await response.json();

                for (const friend of records) {
                    friendList.set(friend.uuidReceiver === UUID ? await mcApi.getUsername(friend.uuidSender) : await mcApi.getUsername(friend.uuidReceiver), Intl.DateTimeFormat('en-GB').format(new Date(friend.started)))
                }
                flCache[player] = friendList;
                setTimeout(() => { delete flCache[player] }, 600000)
                return friendList;
            }
        return flCache[player] ? flCache[player] : getFriendList();
    },

    recentGames: async (player) => {
        if (!player) return Promise.reject(`This function requires an input`);
        let UUID = uuidCache[player] || await mcApi.getUUID(player).then(r => {
            uuidCache[player] = r;
            setTimeout(() => { delete uuidCache[player] }, 15 * 60000)
            return r;
        });
        const response = await fetch(`${BASE_KEY}/recentgames?uuid=${UUID}&key=${process.env.HYPIXEL_API_KEY}`);
        const r = await response.json();
        return r.games;
    },

    playerStatus: async (player) => {
        if (!player) return Promise.reject(`This function requires an input`);
        let UUID = uuidCache[player] || await mcApi.getUUID(player).then(r => {
            uuidCache[player] = r;
            setTimeout(() => { delete uuidCache[player] }, 15 * 60000)
            return r;
        });
        const response = await fetch(`${BASE_KEY}/status?uuid=${UUID}&key=${process.env.HYPIXEL_API_KEY}`);
        if (response.status !== 200) return Promise.reject(`${response.status} ${response.statusText}`);
        const json = await response.json();
        return json.session.online;
    },

    playerGuild: (player) => {
        if (!player) return Promise.reject(`This function requires an input`);
            async function getPlayerGuild(){
                let UUID = uuidCache[player] || await mcApi.getUUID(player).then(r => {
                    uuidCache[player] = r;
                    setTimeout(() => { delete uuidCache[player] }, 15 * 60000)
                    return r;
                });
                const response = await fetch(`${BASE_KEY}/guild?player=${UUID}&key=${process.env.HYPIXEL_API_KEY}`);
                if (response.status !== 200) return Promise.reject(`${response.status} ${response.statusText}`);
                const json = await response.json();
                playerGuildCache[player] = json.guild.name;
                setTimeout(() => { delete playerGuildCache[player] }, 600000)
                return json.guild.name;
            }
        return playerGuildCache[player] ? playerGuildCache[player] : getPlayerGuild();
    },

    guildData: async (guildName) => {
        if (!guildName) return Promise.reject(`This function requires an input`);
        const response = await fetch(`${BASE_KEY}/guild?name=${guildName}&key=${process.env.HYPIXEL_API_KEY}`);
        if (response.status !== 200) return Promise.reject(`${response.status} ${response.statusText}`);
        const json = await response.json();
        return json.guild;
    }
}

module.exports.playerGuild("de_grote").then(r=>console.log(r));

// MAYBE CACHE GUILD DATA? DUNNO