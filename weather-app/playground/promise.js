const request = require("request");

let API_Promise = new Promise((resolve, reject) => {
    request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=Pune&${process.env.GOOGLE_API_KEY}`,
            json: true
        },
        (error, response, body) => {
            if (!error && response.statusCode === 200)
                resolve(body);
            else
                reject('Can not contact google servers');

        }
    );
});

API_Promise.then((success) => {
    console.log(success);
}, (errorMessage) => {
    console.log(errorMessage);
});