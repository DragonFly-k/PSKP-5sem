const net = require('net')
const PORT = 4000

let client = new net.Socket()
let buffer = new Buffer.alloc(4);
let num = isNaN(process.argv[2]) ? process.exit() : process.argv[2];
client.connect(PORT, () => {
    setInterval(() => {client.write((buffer.writeInt32LE(num, 0), buffer))}, 1000).unref()
})
client.on('data', (data) => {console.log(`sum: ${data.readInt32LE()}`)})
client.on('close', (data) => {
    console.log('close');
    client.destroy();
})
client.on('error', (err) => { console.log(`${err}`);})
setTimeout(() => {client.destroy()}, 20000)