const app = require('./app');
const ConfigManager = require('./services/configManager');

const PORT = ConfigManager.getServerPort();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
