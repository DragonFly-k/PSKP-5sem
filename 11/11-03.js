const WebSocket = require('ws');
const wss = new WebSocket.Server({port:4000, host:'localhost', path:'/'});

let k = 0;
wss.on('connection', (ws) => { 
    ws.on('pong', (data) => {console.log('on pong: ', data.toString()); });
    setInterval(() => {ws.send(`11-03-server: ${++k}`)}, 15000);
    setInterval(() => {
        console.log(wss.clients.size);
        ws.ping('server: ping');
    }, 5000);
});

wss.on('error', (e) => { console.log('error ', e) });