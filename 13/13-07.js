const net = require('net')
net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log(`40000: ${data}`)
        socket.write(`ECHO: ${data}`)
    })
}).listen(40000)

net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log(`50000: ${data}`)
        socket.write(`ECHO: ${data}`)
    })
}).listen(50000)