const WebSocket = require("ws");
const ws = new WebSocket("ws:/localhost:4000/wsserver");

let n = 0;
let timer = null;
ws.on("open", () => {
    console.log("socket.open");
    ws.on("message", (e) => {console.log(`${e}`);});
    timer = setInterval(() => {ws.send(`10-01-client: ${++n}`);}, 3000);
    setTimeout(() => {
        clearInterval(timer); 
        n = 0; 
        console.log("close connection"); 
        ws.close();
    } ,25000);
});