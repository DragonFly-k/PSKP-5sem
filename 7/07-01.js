var http = require("http");
var stat = require("./m07-01")("./static");

var http_handler = function(req, res) {
    switch (req.method) {
    case 'GET' : 
            if  (stat.isStatic("html", req.url)) stat.sendFile(req, res, {"Content-Type": "text/html; charset=utf-8"});
        else if (stat.isStatic("css", req.url))  stat.sendFile(req, res, {"Content-Type": "text/css; charset=utf-8"});
        else if (stat.isStatic("js", req.url))   stat.sendFile(req, res, {"Content-Type": "text/javascript; charset=utf-8"});
        else if (stat.isStatic("docx", req.url)) stat.sendFile(req, res, {"Content-Type": "application/msword; charset=utf-8"});
        else if (stat.isStatic("png", req.url))  stat.sendFile(req, res, {"Content-Type": "image/png; charset=utf-8"});
        else if (stat.isStatic("mp4", req.url))  stat.sendFile(req, res, {"Content-Type": "video/mp4; charset=utf-8"});
        else if (stat.isStatic("json", req.url)) stat.sendFile(req, res, {"Content-Type": "application/json; charset=utf-8"});
        else if (stat.isStatic("xml", req.url))  stat.sendFile(req, res, {"Content-Type": "application/xml; charset=utf-8"});
        else stat.writeHTTP404(res); break;
    default: 
        res.writeHead(405, {"Content-Type" : "text/plain; charset=utf-8"});
        res.end("Method not allowed");
        break;
    }
};

var server = http.createServer();
server.listen(5000, function(v) {console.log("http://localhost:5000/index.html")})
            .on("error", function(e) {console.log("http://localhost:5000/index.html: error: ", e.code)})
            .on("request", http_handler);