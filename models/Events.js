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
        type: String
    },
    donationAmt: {
        type: Number
    },
    donerName: {
        type: String,
        required: true
    },
    donerFeedback: {
        type: String
    }
});

module.exports = mongoose.model("event", EventSchema);
