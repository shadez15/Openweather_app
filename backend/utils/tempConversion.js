const kelvinToCelsius = (kelvin) => kelvin - 273.15;
const kelvinToFahrenheit = (kelvin) => (kelvin - 273.15) * 9/5 + 32;

module.exports = { kelvinToCelsius, kelvinToFahrenheit };
