const net = require('net')

if (isNaN(process.argv[2])) {process.exit()}

let client = new net.Socket()
client.connect(Number(process.argv[2]), () => {
    setInterval(() => {
        let num = Math.floor(Math.random() * 10).toString()
        client.write(num)
    }, 1000).unref()
})
client.on('data', (data) => {console.log(`${data}`)})
client.on('close', (data) => {
    console.log('close')
    client.destroy()
})
client.on('error', (err) => { console.log(`${err}`); process.exit() })
setTimeout(() => {client.destroy()}, 20000)