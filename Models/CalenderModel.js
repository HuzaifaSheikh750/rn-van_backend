const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    startDate: {
        type: String,
    },
    endDate : {
        type: String,
    },
    allday : {
        type: Boolean,
    },
});

module.exports = mongoose.model("Schedule", scheduleSchema);