const net = require('net')
const PORT = 4000
let sum = 0

net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log(`${data}`)
        sum += Number(data)
    })
    setInterval(() => {
        socket.write(sum.toString())
    }, 5000).unref()
    socket.on('close', (data) => {
        console.log('Client disconnected')
    })
}).listen(PORT)