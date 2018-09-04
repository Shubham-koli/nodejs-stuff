// library imports
const express = require("express");
const bodyParser = require("body-parser");
const _ = require('lodash');
const {
    ObjectID
} = require('mongodb');

// local imports
const {
    mongoose
} = require("./db/mongoose");
const {
    Todo
} = require("./models/todo");
const {
    User
} = require("./models/users");

var app = express();
app.use(bodyParser.json());

app.post("/todos", (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then(
        doc => {
            res.send(doc);
        },
        err => {
            res.status(400).send(err);
        }
    );
});

app.get("/todos", (req, res) => {
    Todo.find().then(
        doc => {
            let count = _.size(doc);
            res.send({
                doc,
                count
            });
        },
        err => {
            res.status(500).send(err);
        }
    );
});

//variables can be separated by the & or /

app.get('/todos/:id', (req, res) => {
    let recordID = req.params.id;
    if (!ObjectID.isValid(recordID)) {
        res.status(502).send('INVALID REQUEST! CHECK ID AGAIN');
    } else {
        Todo.findById(recordID).then((todo) => {
            console.log(todo);
            if (!todo) {
                res.status(404).send('ID NOT FOUND');
            } else {
                res.send(todo);
            }
        }).catch((err) => {
            console.log(err);
        });
    }
});

app.listen(3000, () => {
    console.log("Started on port 3000");
});