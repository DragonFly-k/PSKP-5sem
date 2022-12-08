const rpc = require('rpc-websockets').Server;
let server = new rpc({port: 4000, host: 'localhost'});

server.register('A', (params) => {console.log('A')}).public(); 
server.register('B', (params) => {console.log('B')}).public();
server.register('C', (params) => {console.log('C')}).public();