require("dotenv").config();
const yargs = require("yargs");
const request = require("request");
let fs = require("fs");
const color = require("colors/safe");
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
//const promise = require('./playground/promise');
let argv = yargs
  .options({
    a: {
      demand: true,
      alias: "Address",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("help", "h")
  .argv;

let address = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(argv.a);
let location;

//Output the weather
geocode.geocodeAddress(address, (errorMessage, results) => {
  if (errorMessage)
    console.log(color.red(errorMessage));
  else {
    console.log(color.cyan(JSON.stringify(results, undefined, 2)));
    location = results;

    weather.getWeather(location, (errorMessage, results) => {
      if (errorMessage)
        console.log(color.red(errorMessage));
      else {
        console.log("Summery " + color.green(JSON.stringify(results.currently.summary)));
        console.log("Temperature " + color.green(JSON.stringify(results.currently.temperature)));
        show('Precipitation', results.currently.precipType);
      }
    });

  }
});

let show = (fieldname, field) => {
  if (field)
    console.log(`${fieldname} ` + color.green(JSON.stringify(field)));
};
//needs some work
//promise.geocodeAddress(encodeURIComponent(argv.a));