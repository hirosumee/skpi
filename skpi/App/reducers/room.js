import {MESSAGE_LOAD, MESSAGE_UNLOAD} from "../shared/action-types";

const defaultState = {
    room_id: undefined,
    messages: []
};
export default function (state = defaultState, action) {
    switch (action.type) {
        case MESSAGE_LOAD: {
            let {room_id, messages} = action.payload;
            return {room_id, messages};
        }
        case MESSAGE_UNLOAD : {
            return {
                room_id: undefined,
                messages: []
            };
        }
        default: {
            return state;
        }
    }
}