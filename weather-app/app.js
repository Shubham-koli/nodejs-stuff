const request = require('request');
var fs = require("fs");
const color = require('colors/safe');

var baseURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
var city = 'Pune';
const APIkey = '&key=AIzaSyA4Q7APjWXCpxYG7etHAsv4V-V10yz_rZI';

var logLocation = (response) =>                  
{
    fs.writeFileSync('location-data.json', JSON.stringify(response), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
};
 
var showInfo = (body) => {
    console.log(color.cyan(`Address is ${body.results[0].formatted_address}
    Location:\n    Latitude: ${body.results[0].geometry.location.lat}
    and Longitude: ${body.results[0].geometry.location.lng} `));
}


request({
    url: baseURL + city + APIkey,
    json: true
}, (error, response, body) => {
    if(error) console.log(error);
    logLocation(body);
    //console.log(JSON.stringify(body, undefined, 2));
    showInfo(body);
});

