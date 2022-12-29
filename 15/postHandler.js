const URL = require("url");
WriteToJson = (r, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(r));
}
WriteError = (err, res) => {
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(err));
}

exports.PostHandler = (url, req, res,faculty,pulpit,client) =>
{
    let pathParts = url.split('/');
    const parsedUrl = URL.parse(url);
    let body = '';
    switch (true) {
        case url === '/api/faculties':
            req.on('data', chunk => {body += chunk.toString();});
            req.on('end', () => {
                let facultyToInsert = JSON.parse(body);
                faculty.insertOne(facultyToInsert).then(r =>WriteToJson(facultyToInsert, res))
                .catch(err => {WriteError(err, res);});
            });
            break;
        case url === '/api/pulpits':
            req.on('data', chunk => {body += chunk.toString();} );
            req.on('end', () => {
                let pulpitToInsert = JSON.parse(body);
                pulpit.insertOne(pulpitToInsert).then(r => {WriteToJson(pulpitToInsert, res)})
                .catch(err => {WriteError(err, res);});
            });
            break;
        case  url ===  "/transaction":
            req.on('data', chunk => {body += chunk.toString();});
            req.on('end', async () => {
                let PulpitsToInsert = JSON.parse(body);
                let session = client.startSession();
                session.startTransaction();
                try {
                    await pulpit.insertMany(PulpitsToInsert, {session: session});
                    await session.commitTransaction();
                    session.endSession();
                    WriteToJson(PulpitsToInsert, res);
                    console.log("Transaction committed.");
                }
                catch (err) {
                    await session.abortTransaction();
                    console.log(`Transaction aborted. Caught exception: ${err}`);
                    session.endSession();
                    WriteError(err, res);
                }
                finally {session.endSession();}
            });
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
    }
}