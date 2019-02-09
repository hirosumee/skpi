const authHelper = require('../../../helpers/auth.helper');
const userModel = require('../../../models/user.model');
const _ = require('lodash');
function initSessionWithSsid(socket) {
    return function (payload, fn = _.noop) {

        console.log(payload);
        let { ssid } = payload;
        let credential = authHelper.verifySsid(ssid);
        if(credential) {
            //query in db
            let { username } = credential;
            socket.user = { username};
            socket.setAuthenticated();
            return fn({ username});
        } else {
            fn({ status: 'error', message: 'session-error'});
        }
    }
}
function initSessionWithCre(socket) {
    return function (payload, fn = _.noop) {

        console.log(payload);
        let { username , password } = payload;
        if(username !== undefined && password !== undefined) {
            userModel.createUser(username, password);
            let ssid = authHelper.createSsid(username);
            socket.setAuthenticated();
            return fn({ username, ssid });
        } else {
            return fn({ status: 'error', message: 'session-error'});
        }
    }
}

module.exports = {
    initSessionWithSsid,
    initSessionWithCre
};