function Stat(sfn='./static'){
    var url = require('url');
    this.STATIC_FOLDER=sfn;
    this.isStatic = (ext, fn)=>{ let reg = new RegExp(`^\/.+\.${ext}$`); return reg.test(fn);}
    let pathStatic=(fn)=>{return `${this.STATIC_FOLDER}${fn}`;}
    this.writeHTTP404=(res)=>{
            res.statusCode = 404;
            res.statusMessage = 'Resourse not found';
            res.end('Resourse not found');
    }
    let fs=require('fs');
    var k=0;
    let pipeFile = (req, res, headers)=>{
        res.writeHead(200, headers);
        console.log(res.statusCode);
        console.log(k++);
        console.log(pathStatic('/'+(decodeURI(url.parse(req.url,true).pathname).split('/'))[2]))
        fs.createReadStream(pathStatic('/'+(decodeURI(url.parse(req.url,true).pathname).split('/'))[2])).pipe(res);
    }
    this.sendFile = (req, res, headers)=>{
        if(fs.access(pathStatic('/'+(decodeURI(url.parse(req.url,true).pathname).split('/'))[2]), fs.constants.R_OK,err=>{
            if(err) 
            {
                console.log(pathStatic('/'+(decodeURI(url.parse(req.url,true).pathname).split('/'))[2]));
                this.writeHTTP404(res);
            }
            else pipeFile(req,res,headers);
        }))
        {this.writeHTTP404(res)};
        }
    }
    module.exports= (parm)=>{return new Stat(parm);}