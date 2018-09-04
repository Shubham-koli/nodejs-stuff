const mongoose = require('mongoose');

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

module.exports = {
    User
};