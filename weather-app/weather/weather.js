const request = require("request");
const color = require("colors/safe");
const geocode = require('../geocode/geocode');

const Weather_APIkey = process.env.WEATHER_API_KEY;

var getWeather = (location, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${Weather_APIkey}/${location.latitude},${location.longitude}?units=si&exclude=daily,hourly,minutely`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            geocode.logData(body);
            callback(undefined, body);
        } else
            callback('Error Connceting Weather Forecasting Servers');
    });
};


module.exports = {
    getWeather
};