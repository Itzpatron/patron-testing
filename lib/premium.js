const fs = require('fs');
const path = require('path');

const userDBFile = path.join(__dirname, 'userDB.json');

// Load premium users from file or initialize an empty array
let premiumUsers = fs.existsSync(userDBFile) ? JSON.parse(fs.readFileSync(userDBFile)) : [];

// Check if a user is premium
const isPremiumUser = (user) => premiumUsers.includes(user);

// Add a premium user
const addPremiumUser = (user) => {
    if (premiumUsers.includes(user)) return false; // Already premium
    premiumUsers.push(user);
    saveUserDB();
    return true;
};

// Remove a premium user
const delPremiumUser = (user) => {
    const index = premiumUsers.indexOf(user);
    if (index === -1) return false; // Not found
    premiumUsers.splice(index, 1);
    saveUserDB();
    return true;
};

// Save to JSON file
const saveUserDB = () => fs.writeFileSync(userDBFile, JSON.stringify(premiumUsers, null, 2));

module.exports = { isPremiumUser, addPremiumUser, delPremiumUser };