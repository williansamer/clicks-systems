const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
    name: {type: String, required: true},
    sn:  {type: String, required: true},
    url: {type: String, required: true},
    clicks: {type: Number, default: 0}
}, {versionKey: false});

module.exports = mongoose.model("User", linkSchema);