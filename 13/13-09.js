const dgram = require('dgram')
const PORT = 4000

let server = dgram.createSocket('udp4')
server.on('message', (msg, info) => {
    console.log(`${msg}`)
    server.send(`ECHO: ${msg}`, info.port)
})
server.on('error', (err) => { console.log(`${err}`);})
server.bind(PORT)