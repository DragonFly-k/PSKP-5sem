const WebSocket = require('ws');
const wss = new WebSocket.Server({port:4000, host:'localhost'});

let n = 0;
wss.on('connection', (ws)=>{
    let x;
    ws.on('message', (data)=>{
        x =  JSON.parse(data);
        console.log('on message: ', x);
    });
    setInterval(()=> {ws.send(JSON.stringify({server: n++, client: x.client, timestamp: new Date().toDateString()}))}, 5000);
});

wss.on('error', (e)=>{console.log('wss server error', e)});