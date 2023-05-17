const mongoose = require('mongoose');
// const bcrypt = require("bcrypt")

const driverSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
    },
  role: {
    type: String,
    enum: ['student', 'driver', 'admin'],
    default: 'driver'
    },

});

module.exports = mongoose.model('Driver', driverSchema);
