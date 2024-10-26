const Alert = require('../models/Alert');
const Weather = require('../models/Weather');


const createAlert = async (req, res) => {
    const { city, temperatureThreshold, weatherCondition, consecutiveUpdates } = req.body;

    try {
        const newAlert = new Alert({
            city,
            temperatureThreshold,
            weatherCondition,
            consecutiveUpdates,
        });

        await newAlert.save();
        res.status(201).json(newAlert);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create alert' });
    }
};


const getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find();
        res.json(alerts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch alerts' });
    }
};


const deleteAlert = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAlert = await Alert.findByIdAndDelete(id);
        if (!deletedAlert) {
            return res.status(404).json({ error: 'Alert not found' });
        }
        res.json({ message: 'Alert deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete alert' });
    }
};


const checkAlerts = async () => {
    try {
        const alerts = await Alert.find();

        for (const alert of alerts) {
            const { city, temperatureThreshold, weatherCondition, consecutiveUpdates } = alert;

            
            const recentWeather = await Weather.find({ city }).sort({ dt: -1 }).limit(consecutiveUpdates);

            if (recentWeather.length < consecutiveUpdates) {
                console.log(`Insufficient data for alert in ${city}`);
                continue;
            }

            
            const alertTriggered = recentWeather.every((weather) => 
                (temperatureThreshold && weather.temp >= temperatureThreshold) ||
                (weatherCondition && weather.weather === weatherCondition)
            );

            if (alertTriggered) {
                console.log(`Alert triggered for ${city}: Temperature exceeded ${temperatureThreshold}°C or ${weatherCondition}`);
               
            }
        }
    } catch (error) {
        console.error('Error checking alerts', error);
    }
};

module.exports = {
    createAlert,
    getAlerts,
    deleteAlert,
    checkAlerts,
};
