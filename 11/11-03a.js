const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:4000/');
ws.on('pong', (data) => {console.log('on pong: ', data.toString()); });
ws.on('message', (data) => {console.log('on message: ', data.toString()); });
setInterval(() => { 
    console.log('client ping');
    ws.ping('client ping')
}, 5000);