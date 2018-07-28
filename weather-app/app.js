const request = require('request');
var fs = require("fs");

var baseURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
var city = 'Pune';
const APIkey = '';


request({
    url: baseURL + city + APIkey,
    json: true
}, (error, response, body) => {
    console.log(error);
    logLocation(body);
    console.log(JSON.stringify(body, undefined, 2));
});

var logLocation = (response) =>                  
{
    fs.writeFileSync('location-data.json', JSON.stringify(response), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
};