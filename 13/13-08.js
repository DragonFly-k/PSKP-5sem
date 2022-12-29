const net = require('net')

let port = isNaN(process.argv[2]) ? process.exit() : process.argv[2];
let client = new net.Socket()
let buf =new Buffer.alloc(4);
client.connect(Number(port), () => {
    setInterval(() => {
        client.write((buf.writeInt32LE(Math.random() * 10,0), buf))
    }, 1000).unref()
})
client.on('data', (data) => {console.log(`${data}`)})
client.on('close', (data) => {
    console.log('close')
    client.destroy()
})
client.on('error', (err) => { console.log(`${err}`); process.exit() })
setTimeout(() => {client.destroy()}, 20000)