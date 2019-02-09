import io from 'socket.io-client';
let socket = io('http://10.0.3.2:3000');
socket.on('connect', function () {
    console.log(arguments, 'connect');
});
export default socket;