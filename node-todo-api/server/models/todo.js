const mongoose = require('mongoose');

const Todo = mongoose.model('Todos', {
    text: {
        type: String,
        required: true,
        minlength: 8,
        trim: 1
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {
    Todo
};