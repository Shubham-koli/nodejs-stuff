const request = require("request");
var fs = require("fs");
const color = require("colors/safe");
const Google_APIkey = process.env.GOOGLE_API_KEY;





var geocodeAddress = (address, callback) => {
    request({
            url: address + Google_APIkey,
            json: true
        },
        (error, response, body) => {
            if (error) {
                callback("Can not connect to google servers.");
            }
            if (body.status === "ZERO_RESULTS") {
                callback("No Results Found");
            }
            logData(body);
            //console.log(JSON.stringify(body, undefined, 2));
            //showInfo(body);
            try {

                callback(undefined, {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng,
                });

            } catch (error) {
                console.log('Can not connect to google servers.');
            }
        }
    );
};

//Writes data into location-data.json
var logData = response => {
    fs.writeFileSync("location-data.json", JSON.stringify(response), err => {
        if (err) throw err;
        console.log("The file has been saved!");
    });
};

//Shows output in Colors.
var showInfo = body => {
    console.log(
        color.cyan(`Address is ${body.results[0].formatted_address}
      Location:\n      Latitude: ${body.results[0].geometry.location.lat}
      and Longitude: ${body.results[0].geometry.location.lng} `)
    );
};



module.exports = {
    geocodeAddress,
    logData
};