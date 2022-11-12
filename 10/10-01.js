const WebSocket = require("ws");
const http = require("http");
const fs = require("fs");

const httpserver = http.createServer((req, res) => {
    if(req.method == "GET" && req.url == "/start") {
        res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
        res.end(fs.readFileSync("10-1.html"));
    }
    else {
        res.writeHead(400, {'Content-type': 'text/plain'});
        res.end('400 error');
    }
});
httpserver.listen(3000);
console.log ('http://localhost:3000/start')

var k = 0, n = 0;
const wss = new WebSocket.Server({port: 4000, host: "localhost", path: "/wsserver"});
wss.on("connection", ws => {
    console.log("Connected");
    ws.on("message", message => {
        n = String(message).substr(13)
        console.log(`${message}`);
    });
    setInterval(() => {ws.send(`10-01-server: ${n}->${++k}`)}, 5000);
});
wss.on("error", e => {console.log("error wsServer", e)});