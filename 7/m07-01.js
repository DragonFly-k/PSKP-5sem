var fs = require("fs");

function stat(dir) {
    this.writeHTTP404 = (res) => {
        res.statusCode = 404;
        res.end("Resourse not found");
    }
    this.isStatic = (ext, fn) => {return (new RegExp(`^\/.+\.${ext}$`)).test(fn);}
    this.pathStatic = (fn) => {return `${dir}${fn}`;}
    this.pipeFile= (req, res, headers) => {
        res.writeHead(200, headers);
        fs.createReadStream(this.pathStatic(req.url)).pipe(res);
    }
    this.sendFile = (req, res, headers) => {
        fs.access(this.pathStatic(req.url), fs.constants.R_OK, 
        err => {
            if(err) this.writeHTTP404(res);
            else this.pipeFile(req, res, headers);
        });
    }
}

module.exports = (parm) => {return new stat(parm);}