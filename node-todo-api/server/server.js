// library imports
const express = require('express');
const bodyParser = require('body-parser');


// local imports
const {
    mongoose
} = require('./db/mongoose');
const {
    Todo
} = require('./models/todo');
const {
    User
} = require('./models/users');

var app = express();

app.listen(3000, () => {
    console.log('Started on port 3000');
});