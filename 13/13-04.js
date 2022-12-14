const net = require('net')
const PORT = 4000

let client = new net.Socket()
client.connect(PORT, () => {
    setInterval(() => {
        client.write(Math.floor(Math.random() * 10).toString())
    }, 1000).unref()
})
client.on('data', (data) => {console.log(`sum: ${data}`)})
client.on('close', (data) => {
    console.log('close')
    client.destroy()
})
setTimeout(() => {client.destroy()}, 20000)