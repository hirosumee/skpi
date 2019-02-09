const mongoose = require('mongoose');
const ROOM_TYPES = require("../shared/common.constant").ROOM_TYPES;
const PRIVATE = require("../shared/common.constant").PRIVATE;
const schema = new mongoose.Schema({
    alias: {type: String },
    members: {
        type: [String], default: [],
    },
    lastMessage: {
        type: mongoose.Schema.ObjectId
    },
    type: {
        type: String,
        default: PRIVATE,
        enum: ROOM_TYPES
    },
    creator: {
        type: String,
        required: true
    }
}, {timestamps: true});
module.exports = mongoose.model('room', schema);