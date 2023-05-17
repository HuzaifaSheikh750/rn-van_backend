const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const profileSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
    },
    cnic: {
        type: String,
    },
});


module.exports = mongoose.model('Profile', profileSchema);


