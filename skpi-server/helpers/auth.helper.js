const jwt = require('jsonwebtoken');
const secret = '29091998';
function createSsid(username) {
    return jwt.sign({ username }, secret);
}
function verifySsid(ssid) {
    return jwt.verify(ssid, secret);
}
module.exports = {
    createSsid,
    verifySsid
};