require('dotenv').config()
const yargs = require('yargs');
const request = require('request');
var fs = require("fs");
const color = require('colors/safe');

var argv = yargs.options({
        a: {
            demand: true,
            alias: 'Address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;


var baseURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
var city = encodeURIComponent(argv.a);
const APIkey = process.env.APIkey;

var logLocation = (response) => {
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
    if (error) console.log(error);
    if (body.status === 'ZERO_RESULTS') {
        console.log('No Results Found');
        process.exit();
    }
    logLocation(body);
    //console.log(JSON.stringify(body, undefined, 2));
    showInfo(body);
});