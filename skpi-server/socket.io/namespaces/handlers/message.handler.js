const _ = require('lodash');
const messageModel = require('../../../models/message.model');
const MESSAGE_TO_CLIENT = require("../../event-types.const").MESSAGE_TO_CLIENT;

function messageFromClient(socket, nsp) {
    return function (payload, fn = _.noop) {
        if (!socket.isAuthenticated()) {
            return fn({status: 'error', message: 'session-error'});
        }
        let date = new Date();
        let {content, type, room_id} = payload;
        let sender = socket.user.username;
        messageModel.create({type, content, sender, date, room_id: room_id});
        nsp.emit(MESSAGE_TO_CLIENT, {type, content, sender, room_id, date });
    }
}
function messageLoad(socket) {
    return async function (payload, fn = _.noop) {
        if (!socket.isAuthenticated()) {
            return fn({status: 'error', message: 'session-error'});
        }
        let { id } = payload;
        let messages = await messageModel.find({ room_id: id});
        fn(messages);
        console.log(messages)
    }
}

module.exports = {
    messageFromClient,
    messageLoad
};