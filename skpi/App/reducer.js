import { combineReducers } from 'redux';
import common from "./reducers/common";
import chat from "./reducers/chat";
import room from "./reducers/room";
export default combineReducers({
    common,
    chat,
    room
});