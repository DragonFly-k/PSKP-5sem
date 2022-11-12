const WebSocket = require("ws");

const wss = new WebSocket.Server({port: 4000, host: "localhost", path: "/broadcast"});
wss.on("connection", ws => {
    console.log("Connected");
    ws.on("message", message => {
        wss.clients.forEach(client => {
            if(client.readyState === WebSocket.OPEN) 
                client.send("server: " + message);
        });
    });
});
wss.on("error", e => {console.log("error wsServer", e)});