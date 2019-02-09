const _ = require('lodash');
const GROUP = require("../../../shared/common.constant").GROUP;
const PRIVATE = require("../../../shared/common.constant").PRIVATE;
const roomModel = require('../../../models/room.model');
const ROOM_TYPES = require("../../../shared/common.constant").ROOM_TYPES;
function roomLoad(socket) {
    return async function (payload, fn = _.noop) {
        if(!socket.isAuthenticated()) {
            return fn({status: 'error', message: 'session-error'});
        }
        let username = socket.user.username;
        let rooms = await roomModel.find({ members: username });
        //
        if(Array.isArray(rooms)) {
            socket.join(rooms.map(room => {
                return room.id;
            }));
        }
        //
        return fn({ rooms });
    }
}
function roomCreate(socket) {
    return async function (payload, fn = _.noop) {
        let { type, members } = payload;
        if(!socket.isAuthenticated()) {
            return fn({status: 'error', message: 'session-error'});
        }
        //check members is valid and room type is valid
        if(!Array.isArray(members) || !~ROOM_TYPES.indexOf(type)) {
            return fn({ status: 'error', message: 'field is invalid'});
        }
        let username = socket.user.username;
        let z = Object.assign({}, members);
        z.push(username);
        switch (type) {
            case PRIVATE : {
                let room = await roomModel.create({ members: z, creator: username  });
                let { id } = room;
                break;
            }
            case GROUP: {
                let room = await roomModel.create({ members: z, creator: username, type: GROUP });
                let { id } = room;
                break;
            }
            default:{

            }
        }
    }
}
module.exports = {
    roomLoad,
    roomCreate
};