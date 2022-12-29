const net = require('net')

net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log(`40000: ${data.readInt32LE()}`)
        socket.write(`ECHO: ${data.readInt32LE()}`)
    })
    socket.on('error', (err) => { console.log(`${err}`);})
}).listen(40000)

net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log(`50000: ${data.readInt32LE()}`)
        socket.write(`ECHO: ${data.readInt32LE()}`)
    })
    socket.on('error', (err) => { console.log(`${err}`);})
}).listen(50000)