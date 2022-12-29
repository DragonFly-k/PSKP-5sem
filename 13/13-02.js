const net = require('net')

const HOST = '127.0.0.1'
const PORT = 4000

let client = new net.Socket();
client.connect(PORT, HOST, () => {console.log(`Client connected to a server`);});
client.write('Hello from client')
client.on('data', data => {
    console.log(`Client received: ${data.toString()}`);
    client.destroy();
});
client.on('close', () => {console.log('Client closed');});
client.on('error', (err) => { console.log(`${err}`);})