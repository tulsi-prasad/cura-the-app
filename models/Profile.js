const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number
    },
    socialMedia: {
        type: String
    },
    phone: {
        type: Number
    }
});

module.exports = mongoose.model("profile", ProfileSchema);
