const fs = require('fs');
const settingsPath = './database/settings.json'; // Normal path


// ✅ Ensure settings.json exists before calling getMode()
const getMode = async () => {
    try {
        if (!fs.existsSync(settingsPath)) {
            const defaultSettings = { publicMode: true, botOwner: "" };  // Default is now public mode
            fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 2));
        }
        
        let settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));

        // ✅ Ensure NanoBotz is fully connected before accessing user.id
        if (!settings.botOwner || settings.botOwner === "") {
    for (let i = 0; i < 3; i++) { // Retry 3 times
        const { NanoBotz } = require('./index.js'); // ✅ Load NanoBotz only when needed
        if (NanoBotz?.user?.id) {
            settings.botOwner = NanoBotz.user.id.split(':')[0] + "@s.whatsapp.net"; 
            fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
            console.log("✅ Bot owner set to:", settings.botOwner);
            break;
        }
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds
    }
}
        return settings;
    } catch (error) {
        return { publicMode: true, botOwner: "" }; // Return default in case of failure
    }
};

// ✅ Set Public or Private Mode
const setMode = async (isPublic) => {
    try {
        let settings = await getMode();
        settings.publicMode = isPublic;
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    } catch (error) {}
};

// ✅ Export functions
module.exports = { getMode, setMode };