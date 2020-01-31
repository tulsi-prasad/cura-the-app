const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    eventDesc: {
        type: String,
        required: true
    },
    toDonate: {
        type: String,
        required: true
    },
    donationAmt: {
        type: Number,
        default: 0
    },
    donorName: {
        type: String,
        required: true
    },
    donerFeedback: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("event", EventSchema);
