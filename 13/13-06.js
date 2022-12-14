const net = require('net')
const PORT = 4000

let client = new net.Socket()
let num = typeof (process.argv[2] == 'undefined' || process.argv[2] == 'isNaN') ? process.exit() : process.argv[2];
client.connect(PORT, () => {
    setInterval(() => {
        client.write(num.toString())
    }, 1000).unref()
})
client.on('data', (data) => {console.log(`sum: ${data}`)})
client.on('close', (data) => {
    console.log('close');
    client.destroy();
})
setTimeout(() => {client.destroy()}, 20000)