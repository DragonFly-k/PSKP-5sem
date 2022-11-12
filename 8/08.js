var http = require('http');
var url = require('url');
var fs = require('fs');
let stat=require('./m07-01')('./static');
let parseString= require('xml2js').parseString;
let xmlbuilder= require('xmlbuilder');
const {parse} = require('querystring');
let mp=require('multiparty');

let writeHTTP405=(res)=>{
	res.writeHead(405, {"Content-Type" : "text/plain; charset=utf-8"});
    res.end("Method not allowed");
}

let sendingfile=(req,res)=>{
	if(req.method=='GET'){
		if     (stat.isStatic('html', req.url)) stat.sendFile(req,res, {'Content-Type': 'text/html; charset=utf-8'});
		else if(stat.isStatic('css', req.url))  stat.sendFile(req,res, {'Content-Type': 'text/css; charset=utf-8'});
		else if(stat.isStatic('js', req.url))   stat.sendFile(req,res, {'Content-Type': 'text/javascript; charset=utf-8'});
		else if(stat.isStatic('txt', req.url))  stat.sendFile(req,res, {'Content-Type': 'text/plain; charset=utf-8'});
		else if(stat.isStatic('png', req.url))  stat.sendFile(req,res, {'Content-Type': 'image/png; charset=utf-8'});
		else if(stat.isStatic('docx', req.url)) stat.sendFile(req,res, {'Content-Type': 'application/msword; charset=utf-8'});
		else if(stat.isStatic('json', req.url)) stat.sendFile(req,res, {'Content-Type': 'application/json; charset=utf-8'});
		else if(stat.isStatic('xml', req.url))  stat.sendFile(req,res, {'Content-Type': 'application/xml; charset=utf-8'});
		else if(stat.isStatic('mp4', req.url))  stat.sendFile(req,res, {'Content-Type': 'video/mp4; charset=utf-8'});
		else stat.writeHTTP404(res);
		}
		else writeHTTP405(res);
}

let http_handler=(req,res)=>
{
	if(req.method=='GET'){
		if(url.parse(req.url).pathname === '/connection'){
			let q= url.parse(req.url,true).query;
			res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
			if(q['set']!=null)
			{
				server.keepAliveTimeout= +q['set'];
				res.end('New value of KeepAliveTimeout: ' +server.keepAliveTimeout);
			}
			else res.end('KeepAliveTimeout:'+server.keepAliveTimeout);
		}
		else if(url.parse(req.url).pathname === '/headers'){
			res.setHeader('X-author','Katty');
			res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
			res.end(`${JSON.stringify(req.headers)}${JSON.stringify(res.getHeaders())}`);
		}
		else if(url.parse(req.url).pathname === '/parameter'){
			res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
			let q= url.parse(req.url,true).query;
			if(!isNaN(+q['x']) && !isNaN(+q['y']))
			{
			let x=+q['x'];
			let y=+q['y'];
			let result='';
			result+='x+y='+(x+y)+'\n';
			result+='x-y='+(x-y)+'\n';
			result+='x*y='+(x*y)+'\n';
			result+='x/y='+(x/y)+'\n';
			res.end(result);
			}
			else res.end("Error: Enter Numbers");
		}
		else if(url.parse(req.url).pathname.search('\/parameter\/[a-zA-Z1-9]+\/[a-zA-Z1-9]+$')!=(-1))
		{
			res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
			let r =url.parse(req.url,true).pathname.split('/');
			let x=+r[2];
			let y=+r[3];
			if(!isNaN(x) && !isNaN(y))
			{
				let result='';
			    result+='x+y='+(x+y)+'\n';
			    result+='x-y='+(x-y)+'\n';
			    result+='x*y='+(x*y)+'\n';
			    result+='x/y='+(x/y)+'\n';
			    res.end(result);
			}
			else res.end(url.parse(req.url,true).pathname);
		}
		else if(url.parse(req.url).pathname=== '/close')
		{
			res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
			setTimeout(()=>{server.close()},10000);
			res.end("Server close after 10 seconds");
		}
		else if(url.parse(req.url).pathname=== '/socket')
		{
			res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
			res.write('Port Client:'+res.socket.remotePort+'<br\/>');
			res.write('IP Client:'+res.socket.remoteAddress+'<br\/>');
			res.write('Port Server:'+req.socket.localPort+'<br\/>');
			res.end('Address Server'+req.socket.localAddress+'<br\/>');
		}
		else if(url.parse(req.url).pathname=== '/req-data')
		{
			res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
			let buf='';
			req.on('data',(data)=>{console.log('request.on(data) =',data.length); buf+=data;});
			req.on('end',()=>{console.log('request.on(end) =',buf.length);});
			res.write('Порционная обработка');
			res.end(buf);
		}
		else if(url.parse(req.url).pathname=== '/resp-status')
		{
			let q= url.parse(req.url,true).query;
			if(q['code'] != undefined && q['mess']!=undefined)
			{
				res.statusCode = +q['code'];
				res.statusMessage = q['mess'];
				res.end(q['code'] + q['mess']);
			}
			else res.end('Enter parameters');
		}
		else if(url.parse(req.url).pathname=== '/files')
		{
			let folder='./static';
			let n =fs.readdirSync(folder).length;
			res.setHeader('X-static-files-count',n);
			res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
			res.end('X-static-files-count:'+n);
		}
		else if(url.parse(req.url).pathname.search('\/files\/[a-zA-Z1-9]+.[a-zA-Z1-9]+$')!=(-1))
		{
			sendingfile(req,res);
		}
		else if(url.parse(req.url).pathname=== '/upload')
		{
			let html= fs.readFileSync('./static/upload.html');
			res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
			res.end(html);
		}
        else if (url.parse(req.url).pathname === '/formparameter') 
        { 
            let html = fs.readFileSync('./static/form.html');
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(html);
        }
		else res.end(stat.writeHTTP404(res));
	}
	else if(req.method=='POST'){
		if(url.parse(req.url).pathname=== '/formparameter')
		{   
			res.writeHead(200, {'Content-Type': 'text/plain'});
            let data = '';
            req.on('data', chunk => { data += chunk; });
            req.on('end', () => {res.end(data);});
		}
		else if(url.parse(req.url).pathname=== '/json')
		{
            let data = '';
            req.on('data', (chunk) => { data += chunk; });
            req.on('end', () => {
                res.writeHead(200, {'Content-type': 'application/json; charset=utf-8'});
                data = JSON.parse(data);
                let jsonResponse = {};
                jsonResponse._comment = 'Response: ' + data._comment;
                jsonResponse.x_plus_y = data.x + data.y;
                jsonResponse.Concatenation_s_o = data.s + ': ' + data.o.surname + ', ' + data.o.name;
                jsonResponse.Length_m = data.m.length;
                res.end(JSON.stringify(jsonResponse));
            });
        }
		else if(url.parse(req.url).pathname=== '/xml')
		{
            let sumx=0, resultm='', id='', body='';
			req.on('data',chunk=>{body+=chunk.toString();});
			req.on('end',()=>{
				parseString(body,function(err,result)
				{
					id=result.request.$.id;
					result.request.x.map((e,i)=>{
						sumx+=(+e.$.value);
					});
					result.request.m.map((e,i)=>{
						resultm+=e.$.value;
					});
				});
				let result=xmlbuilder.create('response').att('id',id);
				result.ele('sum',{element:"x",result:sumx});
				result.ele('concat',{element:"m",result:resultm});
				res.writeHead(200,{'Content-Type': 'application/xml'});
				res.end(result.toString());});
			}
            else if(url.parse(req.url).pathname=== '/upload')
			{
				let result='';
				let form =new mp.Form({uploadDir:'./static'});
				form.on('field',(name,value)=>{result+=`${name}= ${value}<br/>`;});
				form.on('file', (name, file)=>{
					result+=`${name}= ${file.originalFilename}: ${file.path}<br/>`;
				});
				form.on('error',(err)=> {
					res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
					res.write('Form/error: '+err);
					res.end()
				});
				form.on('close',()=>{
					res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
					res.write('Form<br/>');
					res.end(result);
				})
				form.parse(req);
			}
			else res.end(stat.writeHTTP404(res));
	}
	else writeHTTP405(res);
}
var server=http.createServer(function (req, res){
    http_handler(req,res);}).listen(5000, () => {
    console.log("http://localhost:5000/connection");
    console.log("http://localhost:5000/connection?set=2000");
    console.log("http://localhost:5000/headers");
    console.log("http://localhost:5000/parameter?x=15&&y=5");
    console.log("http://localhost:5000/parameter/15/5");
    console.log("http://localhost:5000/close ");
    console.log("http://localhost:5000/socket");
    console.log("http://localhost:5000/req-data");
    console.log("http://localhost:5000/resp-status?code=200&&mess=Hello");
    console.log("http://localhost:5000/formparameter");
	console.log("http://localhost:5000/files");
    console.log("http://localhost:5000/files/pic.png");
    console.log("http://localhost:5000/upload");
    });