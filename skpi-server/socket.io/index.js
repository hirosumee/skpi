const Socket = require('socket.io/lib/socket');
/**
 * isAuthenticated value
 * @type {boolean}
 * @private
 */
Socket.prototype._isAuthenticated = false;
Socket.prototype.isAuthenticated = function() {
    return !!this._isAuthenticated;
};
Socket.prototype.isUnAuthenticated = function() {
    return !this._isAuthenticated;
};
Socket.prototype.setAuthenticated = function() {
    this._isAuthenticated = true;
};


module.exports = function (io) {
    require('./namespaces/common.namespace')(io);
};