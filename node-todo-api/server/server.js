var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {
    useNewUrlParser: true
}, (err) => {
    if (err) {
        console.log('Unable to connect MongoDB server', err);
    }
});

const Todo = mongoose.model('Todos', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 8,
        trim: 1
    },
    userID: {
        type: String,
        type: String,
        required: true,
        minlength: 3,
        trim: 1
    },
    pwd: {
        type: String,
        required: true,
        minlength: 8,
        trim: 1
    }
});
// let newTodo = new Todo({
//     text: 'Cook Dinner'
// });

// let newTodo = new Todo({
//     text: 'Walk the dog',
//     completed: true,
//     completedAt: 8421999884
// })

let newUser = new User({
    email: 'shubham.koli@outlook.in',
    userID: 'FaultyCarry',
    pwd: 'secret123'
});


newUser.save().then((doc) => {
    console.log('User Created', doc);
}, (err) => {
    console.log('Unable to Create the User', err);
});

// newTodo.save().then((doc) => {
//     console.log('Saved Todo', doc);
// }, (err) => {
//     console.log('Unable to save the Todo', err);
// });