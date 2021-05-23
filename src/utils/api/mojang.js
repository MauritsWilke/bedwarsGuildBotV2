const fetch = require('node-fetch');

// GET CAPE(s)

module.exports = {
    getUUID,
    getSkin,
    getUsername,
    getNameHistory
}

async function getUUID(username) {
    if (!username) return Promise.reject(`This function requires an input`);
    if (!username.match(/^[a-z0-9_]*$/i)) return Promise.reject(`${username} is an invalid username`);
    const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
    if (!response.ok) return Promise.reject(`${username} does not exist`);
    const json = await response.json()
    return json.id;
}

async function getSkin(username) {
    if (!username) return Promise.reject(`This function requires an input`);
    if (!username.match(/^[a-z0-9_]*$/i)) return Promise.reject(`${username} is an invalid username`);
    const UUID = await module.exports.getUUID(username);
    const response = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${UUID}`);
    if (!response.ok) return Promise.reject(`API Outage`);
    const json = await response.json();
    const r = JSON.parse(Buffer.from(json.properties[0].value, 'base64').toString('ascii'));
    return r.textures.SKIN.url;
}

async function getUsername(playerUUID) {
    if (!playerUUID) return Promise.reject(`This function requires an input`);
    if (!playerUUID.match(/[\d-]/i)) return Promise.reject(`Please submit a valid UUID`);
    const response = await fetch(`https://api.mojang.com/user/profiles/${playerUUID}/names`);
    if (!response.ok) return Promise.reject(`API Outage`);
    const json = await response.json();
    return json[json.length - 1].name;
}

async function getNameHistory(player) {
    if (!player) return Promise.reject(`This function requires an input`);
    let nameHistory = new Map();
    if (player.length <= 16) {
        if (!player.match(/^[a-z0-9_]*$/i)) return Promise.reject(`${player} is an invalid username`);
        const UUID = await module.exports.getUUID(player);
        const response = await fetch(`https://api.mojang.com/user/profiles/${UUID}/names`);
        if (!response.ok) return Promise.reject(`API Outage`);
        const r = await response.json();
        r.forEach(element => nameHistory.set(element.name, element.changedToAt ? Intl.DateTimeFormat('en-GB').format(new Date(element.changedToAt)) : "Original name"));
        return nameHistory;

    } else {
        if (!player.match(/[\d-]/i)) return Promise.reject(`Please submit a valid UUID`);
        const response = await fetch(`https://api.mojang.com/user/profiles/${player}/names`);
        if (!response.ok) return Promise.reject(`API Outage`);
        const r = await response.json();
        r.forEach(element => nameHistory.set(element.name, element.changedToAt ? Intl.DateTimeFormat('en-GB').format(new Date(element.changedToAt)) : "Original name"));
        return nameHistory;
    }
}