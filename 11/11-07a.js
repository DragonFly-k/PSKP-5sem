const rpcWSC = require('rpc-websockets').Client;
let ws = new rpcWSC('ws://localhost:4000/');

ws.on('open', () => {
    console.log('Enter A, B or C');
    process.stdin.on('readable', () => {
        while ((chunk  = process.stdin.read())!== null) { 
            let input = chunk.toString().trim();
            if (input === 'A' || input === 'B' || input === 'C') {
                ws.subbscribe(input);
            }
        }
    });
});