const config = require('../../config.json')

module.exports = async (Discord, client, oldMember, newMember) => {
    // const auditLog = await newMember.guild.fetchAuditLogs( { limit: 1})
    // if(auditLog.entries.first().executor.bot) return;
    // //if(newMember.guild.id !== config.server.serverID) return;
    // if(oldMember.nickname == newMember.nickname) return;
    // if(!newMember.roles.cache.find(role => role.name === "verified")) return;

    // let role = newMember.guild.roles.cache.find(role => role.name === "verified");
    // newMember.roles.remove(role.id);
}