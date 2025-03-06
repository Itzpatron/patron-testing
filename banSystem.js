const fs = require('fs');

const banFile = './database/bannedUsers.json';

// ✅ Load banned users

const loadBannedUsers = () => {

    if (!fs.existsSync(banFile)) {

        fs.writeFileSync(banFile, JSON.stringify({ banned: [] }));

    }

    return JSON.parse(fs.readFileSync(banFile));

};

// ✅ Initialize banned users

let bannedUsers = loadBannedUsers();

// ✅ Save banned users

const saveBannedUsers = (bannedList) => {

    fs.writeFileSync(banFile, JSON.stringify(bannedList, null, 2));

};

// ✅ Export for use in other files

module.exports = { bannedUsers, saveBannedUsers, loadBannedUsers };