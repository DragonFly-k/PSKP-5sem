const rpc = require('rpc-websockets').Client;
const ws = new rpc('ws://localhost:4000');

ws.on('open',()=>{
    ws.subscribe('change').then(r => console.log(r))
    ws.on('change',()=>{console.log('Event Change file')})
})