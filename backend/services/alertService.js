const Alert = require('../models/Alert');
const Weather = require('../models/Weather');

const createAlert = async (alertData) => {
    const newAlert = new Alert(alertData);
    return await newAlert.save();
};

const getAllAlerts = async () => {
    return await Alert.find();
};

const deleteAlertById = async (id) => {
    return await Alert.findByIdAndDelete(id);
};


const checkAlerts = async () => {
    const alerts = await getAllAlerts();
    const triggeredAlerts = [];

    for (const alert of alerts) {
        const { city, temperatureThreshold, weatherCondition, consecutiveUpdates } = alert;

        
        const recentWeather = await Weather.find({ city }).sort({ dt: -1 }).limit(consecutiveUpdates);

        
        if (recentWeather.length < consecutiveUpdates) continue;

        
        const alertTriggered = recentWeather.every((weather) =>
            (temperatureThreshold && weather.temp >= temperatureThreshold) ||
            (weatherCondition && weather.weather === weatherCondition)
        );

        if (alertTriggered) {
            triggeredAlerts.push({
                city,
                message: `Alert triggered: ${weatherCondition || ''} in ${city} with temperature >= ${temperatureThreshold}°C`,
            });
        }
    }
    return triggeredAlerts;
};

module.exports = {
    createAlert,
    getAllAlerts,
    deleteAlertById,
    checkAlerts,
};
