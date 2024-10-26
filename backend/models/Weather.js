const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    city: String,
    temp: Number,
    feels_like: Number,
    dt: Number,
    weather: String,
});

module.exports = mongoose.model('Weather', weatherSchema);
