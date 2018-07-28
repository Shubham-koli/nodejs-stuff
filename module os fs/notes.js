console.log("Starting notes.js");

const os = require('os');

module.exports.age = 22;

module.exports.addNote = () =>
{
    console.log("Executing AddNote");
    return 'Your First Note Created';
}

module.exports.whichOS = function () 
{
    var osName = os.type();
    var osRelease = os.release();
    var osInfo = osName + " " + osRelease;
    return osInfo;
}