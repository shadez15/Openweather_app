const cron = require('node-cron');
const openWeatherService = require('./services/openWeatherService');

cron.schedule('*/5 * * * *', async () => {
    console.log('Fetching weather data...');
    await openWeatherService.fetchAndStoreWeatherData();
});
