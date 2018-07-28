/*jshint esversion: 6 */

console.log("Starting app");

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const notes = require("./notes");

var userinfo = os.userInfo();
var firstNote = notes.addNote();
console.log(firstNote);



var hostOS = notes.whichOS();


fs.appendFile('shubham.txt',`\nHello! ${userinfo.username}. You are using ${hostOS} platform.`, function (err)
{
    if(err)
    {
        console.log("Can not write into file because \n");
        console.log(err);
    }
    else
    {
        console.log("Operation Completed");
    }
});



