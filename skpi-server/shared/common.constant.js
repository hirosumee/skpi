//message
const TEXT = 'text';
const IMAGE = 'image';
const FILE = 'file';
const MESSAGE_TYPES =[TEXT, IMAGE, FILE];
//user status
const BUSY = 'busy';
const INVISIBLE = 'invisible';
const ACTIVE = 'active';
const STATUS_TYPES = [BUSY, INVISIBLE,ACTIVE ];
const PRIVATE = 'private';
const GROUP = 'group';
const ROOM_TYPES = [PRIVATE, GROUP];
module.exports = {
    TEXT,
    IMAGE,
    FILE,
    MESSAGE_TYPES,
    STATUS_TYPES,
    BUSY,
    INVISIBLE,
    ACTIVE,
    PRIVATE,
    GROUP,
    ROOM_TYPES
};