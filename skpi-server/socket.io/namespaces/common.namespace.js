const LOAD_MESSAGE = require("../event-types.const").LOAD_MESSAGE;
const ROOM_CREATE = require("../event-types.const").ROOM_CREATE;
const ROOM_LOAD = require("../event-types.const").ROOM_LOAD;
const INIT_WITH_CRE = require("../event-types.const").INIT_WITH_CRE;
const INIT_WITH_SSID = require("../event-types.const").INIT_WITH_SSID;
const MESSAGE_FROM_CLIENT = require("../event-types.const").MESSAGE_FROM_CLIENT;

module.exports = function (nsp) {
    console.log('init common namespace');
    nsp.on('connect', function (socket) {
        console.log(socket.id, 'connected');
        //session
        socket.on(INIT_WITH_SSID, require('./handlers/session.handler').initSessionWithSsid(socket));
        socket.on(INIT_WITH_CRE, require('./handlers/session.handler').initSessionWithCre(socket));
        //message
        socket.on(MESSAGE_FROM_CLIENT,require('./handlers/message.handler').messageFromClient(socket, socket.nsp));
        socket.on(LOAD_MESSAGE, require('./handlers/message.handler').messageLoad(socket));
        //room
        socket.on(ROOM_LOAD, require('./handlers/room.handler').roomLoad(socket));
        socket.on(ROOM_CREATE, require('./handlers/room.handler').roomCreate(socket));
    });
};