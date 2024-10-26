const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        enum: ['delhi', 'mumbai', 'chennai', 'bangalore', 'kolkata', 'hyderabad'],
    },
    date: {
        type: Date,
        required: true,
    },
    avgTemp: {
        type: Number,
        required: true,
        
    },
    maxTemp: {
        type: Number,
        required: true,
        
    },
    minTemp: {
        type: Number,
        required: true,
        
    },
    dominantCondition: {
        type: String,
        required: true,
        enum: ['Clear', 'Rain', 'Snow', 'Clouds', 'Mist', 'Haze', 'Thunderstorm'],
        
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Summary', summarySchema);
