var http = require("http");
let fs = require("fs");
let mp = require('multiparty');

http.createServer(function(req, res) { 
    let form = new mp.Form({uploadDir: "./st"});
    form.on("field", (name, value) => {});
    form.on("file", (name, file) => {});
    form.on("error", (err) => {
        res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
        res.end(`${err}`);
    });
    form.on("close", () => {
        res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
        res.end("Файл получен");
    });
    form.parse(req);
}).listen(5000);

let bound = "---------------------------";

let options = {
    host: "localhost",
    path: "/",
    port: 5000,
    method: "POST",
    headers: {'content-type': 'multipart/form-data; boundary=' + bound}
}

const req = http.request(options, res => {
    console.log(`${res.statusCode}: ${res.statusMessage}`);
    let data = "";
    res.on("data", chunk => {data += chunk.toString("utf8");});
    res.on("end", () => {console.log(`\n${data}`);});
});

req.write("--" + bound + "\r\n");
req.write('Content-Disposition: form-data; name="file"; filename="MyFile.txt"\r\n\r\n');
req.write(fs.readFileSync("MyFile.txt") + "\r\n");
req.write("--" + bound + "--\r\n");
req.end();