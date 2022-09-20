var http = require("http");
var fs = require("fs");

http.createServer(function (request, response){
    let png = fs.readFileSync('./pic.png');
    if(request.url === '/png'){ 
    response.writeHead(200,{'Content-Type':'image/jpeg; charset=utf-8'});
    response.end(png);}
    else{response.end();}
}).listen(5000);
console.log('server.listen(5000)');