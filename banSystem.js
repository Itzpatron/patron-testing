const fs = require('fs');
const banFile = './database/bannedUsers.json';

// ✅ Ensure bannedUsers.json exists before calling getBanList()
const getBanList = () => {
    if (!fs.existsSync(banFile)) {
        fs.writeFileSync(banFile, JSON.stringify({ banned: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(banFile)).banned;
};

const banUser = (user) => {
    let bannedUsers = getBanList();
    if (!bannedUsers.includes(user)) {
        bannedUsers.push(user);
        fs.writeFileSync(banFile, JSON.stringify({ banned: bannedUsers }, null, 2));
    }
};

const unbanUser = (user) => {
    let bannedUsers = getBanList();
    if (bannedUsers.includes(user)) {
        bannedUsers = bannedUsers.filter(u => u !== user);
        fs.writeFileSync(banFile, JSON.stringify({ banned: bannedUsers }, null, 2));
    }
};

// ✅ Make sure the functions are properly exported
module.exports = { getBanList, banUser, unbanUser };