const rpcServer = require('rpc-websockets').Server;
const eventSocket = new rpcServer({ port: 4000, host: 'localhost'}); 

eventSocket.event('A');
eventSocket.event('B');
eventSocket.event('C');

console.log('Enter A, B or C');
process.stdin.on('readable', () => {
    while ((chunk  = process.stdin.read())!== null) { 
        let input = chunk.toString().trim();
        if (input === 'A' || input === 'B' || input === 'C') {
            eventSocket.emit(input);
        }
    }
});