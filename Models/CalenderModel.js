const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    title : {
        type: String,
    },
    start: {
        type: String,
    },
    end : {
        type: String,
    },
    allday : {
        type: Boolean,
    },
});

module.exports = mongoose.model("Schedule", scheduleSchema);