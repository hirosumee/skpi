import {REDIRECT_TO, SESSION_LOADED, SESSION_LOADING} from "../shared/action-types";

const defaultState = {
    inProgress: false,
    username: undefined,
    redirectTo: undefined
};
export default function (state = defaultState, action) {
    switch (action.type) {
        case SESSION_LOADING: {
            return {...state, inProgress: true};
        }
        case SESSION_LOADED: {
            let {username} = action.payload;
            return {...state, inProgress: false, username};
        }
        case REDIRECT_TO: {
            return {...state, redirectTo: action.payload}
        }
        default: {
            return state;
        }
    }
}