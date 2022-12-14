const dgram = require('dgram')
const PORT = 4000

let client = dgram.createSocket('udp4')
client.connect(PORT, () => {
    client.send('Hello from client')
})
client.on('message', (msg, info) => {console.log(`${msg}`); client.close()})
client.on('close', () => {console.log('Client closed');});