import {ROOM_LOADED, ROOM_LOADING} from "../shared/action-types";

const defaultState = {
    rooms: [],
    inProgress: false
};
export default function (state = defaultState, action) {
    switch (action.type) {
        case ROOM_LOADING: {
            return {...state, inProgress: true};
        }
        case ROOM_LOADED: {
            let z = action.payload;
            if (!Array.isArray(z)) {
                return state;
            }
            console.log(z);
            return {...state, inProgress: false, rooms: z};
        }
        default: {
            return state;
        }
    }
}