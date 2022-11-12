const WebSocket = require("ws");
const ws = new WebSocket("ws://localhost:4000/broadcast");

var parm = process.argv[2];
let prfx = typeof parm == 'undefined' ? 'B' : parm;

ws.on("open", () => {
    console.log("socket.open");
    ws.on("message", (e) => {console.log(`${e}`);});
    let k = 0;
    setInterval(() => {
        ws.send(`client ${prfx}-${++k}`);
    }, 2000);
    setTimeout(() => { ws.close() }, 25000)
});