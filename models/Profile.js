const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({});

module.exports = mongoose.model("profile", ProfileSchema);
