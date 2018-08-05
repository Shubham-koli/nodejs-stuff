require("dotenv").config();
const request = require("request");
const geocode = require('../geocode/geocode');
const color = require("colors/safe");
const Weather_APIkey = process.env.WEATHER_API_KEY;

// let API_Promise = new Promise((resolve, reject) => {
//     request({
//             url: `https://maps.googleapis.com/maps/api/geocode/json?address=Pune&${process.env.GOOGLE_API_KEY}`,
//             json: true
//         },
//         (error, response, body) => {
//             if (!error && response.statusCode === 200)
//                 resolve(body);
//             else
//                 reject('Can not contact google servers');

//         }
//     );
// });

// API_Promise.then((success) => {
//     console.log(success);
// }, (errorMessage) => {
//     console.log(errorMessage);
// });



let geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        request({
                url: `https://maps.googleapis.com/maps/api/geocode/json?address=Pune${process.env.GOOGLE_API_KEY}`,
                json: true
            },
            (error, response, body) => {
                if (error) {
                    reject(error);
                    //reject("Can not connect to google servers.");
                } else if (body === undefined || body.status === "ZERO_RESULTS") {
                    reject("No Results Found");
                } else {
                    //logData(body);
                    //console.log(JSON.stringify(body, undefined, 2));
                    //showInfo(body);
                    try {

                        resolve({
                            address: body.results[0].formatted_address,
                            latitude: body.results[0].geometry.location.lat,
                            longitude: body.results[0].geometry.location.lng,
                        });

                    } catch (error) {
                        console.log('Can not connect to google servers.');
                    }
                }
            }
        );
    });
};


let getWeather = (location) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${location.latitude},${location.longitude}?units=si&exclude=daily,hourly,minutely`,
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                geocode.logData(body);
                resolve(body);
            } else {
                reject('Error Connceting Weather Forecasting Servers \n' + error + JSON.stringify(body), JSON.stringify(response));
            }
        });
    });
};

geocodeAddress().then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
    return getWeather(location);
}).then((weatherData) => {
    console.log(JSON.stringify(weatherData.currently.summary, undefined, 2));
}).catch((errorMessage) => {
    console.log(color.red('some error ' + errorMessage));
});

module.exports = {
    geocodeAddress
};