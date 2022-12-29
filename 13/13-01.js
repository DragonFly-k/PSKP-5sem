const net = require('net')
const PORT = 4000;

net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log(data.toString()) 
        socket.write(`ECHO: ${data}`)
    })
    socket.on('error', (err) => { console.log(`${err}`);})
}).listen(PORT , () => {console.log(`Server listening on port ${PORT}`)})