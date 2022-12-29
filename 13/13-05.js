const net = require('net');
let PORT = 4000;
let sum = 0;
let connections = new Map();
let buffer = Buffer.alloc(4);
let i=0;

net.createServer((socket) => {
    socket.id = i++;
    connections.set(socket.id, 0);

    socket.on('data', (data) => {
        console.log(`${data.readInt32LE()}`);
        sum = data.readInt32LE() + connections.get(socket.id);
        connections.set(socket.id, sum);
        sum = 0;
    });

    let writer = setInterval(() => {
        buffer.writeInt32LE(connections.get(socket.id), 0);
        socket.write(buffer);
    }, 5000);

    socket.on('close', data => {
        clearInterval(writer);
        connections.delete(socket.id);
    });

    socket.on('error', (e) => { connections.delete(socket.id);});
}).listen(PORT);