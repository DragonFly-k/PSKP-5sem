const http = require('http');
const parseString = require('xml2js').parseString;
const xmlbuilder = require('xmlbuilder');

http.createServer(function(req, res) {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
        res.writeHead(200, {'Content-type': 'text/xml'});
        parseString(data, function(err, result) {
            let xSum = 0; let mSum = '';
            id=result.request.$.id;
            result.request.x.forEach((p) => {
                xSum += (+p.$.value);
            });
            result.request.m.forEach((p) => {
                mSum += p.$.value;
            });
            let xmlDoc = xmlbuilder.create('response').att('id', id);
            xmlDoc.ele('sum').att('result', xSum);
            xmlDoc.ele('concat').att('result', mSum);
            res.end(xmlDoc.toString());
        });
    });
}).listen(5000);

let parameters = xmlbuilder.create('request').att('id', '19')
.ele('x').att('value', '1').up()
.ele('x').att('value', '2').up()
.ele('x').att('value', '3').up()
.ele('m').att('value', 'a').up()
.ele('m').att('value', 'b').up()
.ele('m').att('value', 'c').up();

let options = {
    host: 'localhost',
    path: '/',
    port: 5000,
    method: 'POST',
    headers: {
        'content-type':'text/xml', 'accept':'text/xml'
    }
};

let req = http.request(options, (res) => {
    console.log('status code:', res.statusCode);
    let responseData = '';
    res.on('data', (chunk) => {responseData += chunk;});
    res.on('end', () => {console.log('body: ', responseData);});
});

req.end(parameters.toString());