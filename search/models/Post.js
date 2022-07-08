const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    desc: {type: String, required: true, unique: true},
    tag: {type: [String], required: true},
    createdAt: {type: Date, required: true, default: Date.now()},
    updatedAt: {type: Date, required: true, default: Date.now()},
});

module.exports = mongoose.model("post", postSchema);