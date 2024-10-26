const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        enum: ['delhi', 'mumbai', 'chennai', 'bangalore', 'kolkata', 'hyderabad'],
    },
    temperatureThreshold: {
        type: Number,
        required: false,
        
    },
    weatherCondition: {
        type: String,
        required: false,
        enum: ['Clear', 'Rain', 'Snow', 'Clouds', 'Mist', 'Haze', 'Thunderstorm'],
        
    },
    consecutiveUpdates: {
        type: Number,
        required: true,
        default: 1,
        
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Alert', alertSchema);
