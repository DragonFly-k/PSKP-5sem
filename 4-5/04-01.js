var http = require('http');
var url = require('url');
var fs = require('fs');
var data = require('./db.js');
var db = new data.DB();

process.stdin.unref();
let countRequest = 0, countCommit = 0;
let timerSd = null, timerSc = null, timerSs = null;
let startTime = null, endTime = null;

db.on('GET', (request, response) => {
    console.log('GET');
    response.end(JSON.stringify(db.get()));
});
db.on('POST', (request, response) => {
    console.log('POST');
    request.on('data', data => 
    {
        let row = JSON.parse(data);
        db.post(row);
        response.end(JSON.stringify(row));
    });
});
db.on('DELETE', (request, response) => {
    console.log('DELETE');
    request.on('data', data => 
    {
        let row = JSON.parse(data);
        let deleteObj = db.delete(row.id);
        console.log(deleteObj);
        response.end(JSON.stringify(deleteObj));
    });
});
db.on('PUT', (request, response) => {
    console.log('PUT');
    request.on('data', data => 
    {
        let row = JSON.parse(data);
        db.put(row);
        console.log(row);
        response.end(JSON.stringify(row));
    });
});
db.on('COMMIT',(request, response) => {
    console.log('COMMIT');
    countCommit++;
    db.commit();
});

let server = http.createServer(function (request, response) {
    if (url.parse(request.url).pathname === '/') {
        let html = fs.readFileSync('./04-02.html');
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.end(html);
    }
    else if (url.parse(request.url).pathname === '/api/db')
    {
        db.emit(request.method, request, response);
    }
    else if(url.parse(request.url).pathname === '/api/ss') {
        response.writeHead(200, {'Content-Type':'application/json'});
        response.end(JSON.stringify(getStats()));
    }
}).listen(5000);

console.log('http://localhost:5000\n'+'http://localhost:5000/api/db\n'+'http://localhost:5000/api/ss');

function getStats() {
	return { start: startTime, end: endTime, 
        requests: countRequest, commits: countCommit };
}

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', () => {
    let command = null;
    while ((command = process.stdin.read()) != null) {
        if (command.trim().startsWith('sd')) {
            let sec = Number(command.trim().replace(/[^\d]/g, ''));
            if(sec) {
                console.log(`Server will close in ${sec} sec`);
                clearTimeout(timerSd);
                timerSd = setTimeout(() =>  { 
                server.close()}, sec * 1000);
            }
            else if(!sec) {
                console.error("ERROR: parameter not integer");
            }
            else if(command.trim().length === 2) {
                clearTimeout(timerSd);
                console.log('SD canceled');
            }
        }
        else if (command.trim().startsWith('sc')) {
            let sec = Number(command.trim().replace(/[^\d]/g, ''));
            if(sec) {
                clearTimeout(timerSc);
                timerSc = setInterval( () => { 
                db.emit('COMMIT')}, sec*1000);
                timerSc.unref();
            }
            else if(!sec) {
                console.error("ERROR: parameter not integer");
            }
            else if(command.trim().length === 2) {
                clearTimeout(timerSc);
                console.log('SC canceled');
            }
        }
        else if (command.trim().startsWith('ss')) {
            let sec = Number(command.trim().replace(/[^\d]/g, ''));
            if(sec) {
                clearTimeout(timerSs);
                startTime = new Date();
                timerSs = setTimeout( () => { 
                    endTime = new Date();
                    process.stdout.write(JSON.stringify(getStats())); 
                }, sec * 1000);
                timerSs.unref();
            }
            else if(!sec) {
                console.error("ERROR: parameter not integer");
            }
            else if(command.trim().length === 2) {
                clearTimeout(timerSs);
                console.log('SS canceled');
            }
        }
    }
});