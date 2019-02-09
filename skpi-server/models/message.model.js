const mongoose = require('mongoose');
const MESSAGE_TYPES = require("../shared/common.constant").MESSAGE_TYPES;
const TEXT = require("../shared/common.constant").TEXT;

const schema = new mongoose.Schema({
    content: {type: String, required: true},
    type: {type: String, required: true, enum: [MESSAGE_TYPES], default: TEXT},
    sender: {type: String, required: true},
    date: {type: Date, required: true},
    room_id: {type: mongoose.Schema.ObjectId, required: true}
}, {timestamps: true});

schema.post('save', function (doc) {
    require('./room.model').findOneAndUpdate({ id: doc.room }, { $set: { lastMessage: doc.id }})
});
module.exports = mongoose.model('message', schema);