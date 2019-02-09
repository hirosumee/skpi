const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ACTIVE = require("../shared/common.constant").ACTIVE;
const STATUS_TYPES = require("../shared/common.constant").STATUS_TYPES;
const schema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    hashPassword: {type: String, required: true},
    status: { type: String, default: ACTIVE , enum: STATUS_TYPES},
    friends: { type: [String], default: [] }
}, { timestamps: true });
schema.statics.createUser = function (username, password) {
    let hashPassword = bcrypt.hashSync(password, 8);
    return this.create({ username, hashPassword});
};
const model = mongoose.model('user', schema);
module.exports = model;