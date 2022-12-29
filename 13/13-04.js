const net = require('net')
const PORT = 4000

let client = new net.Socket()
let buf =new Buffer.alloc(4);
client.connect(PORT, () => { 
    setInterval(() => {
        client.write((buf.writeInt32LE(Math.random() * 10,0), buf))
    }, 1000).unref()
})
client.on('data', (data) => {console.log(`sum: ${data}`)})
client.on('close', (data) => {
    console.log('close')
    client.destroy()
})
client.on('error', (err) => { console.log(`${err}`);})
setTimeout(() => {client.destroy()}, 20000)