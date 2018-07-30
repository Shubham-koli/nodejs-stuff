require("dotenv").config();
const yargs = require("yargs");
const request = require("request");
var fs = require("fs");
const color = require("colors/safe");
const geocode = require('./geocode/geocode.js');

var argv = yargs
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

var address = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(argv.a);


geocode.geocodeAddress(address, (errorMessage, results) => {
  if (errorMessage)
    console.log(errorMessage);
  else
    console.log(results);

});