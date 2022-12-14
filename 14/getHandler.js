const fs = require('fs')
const url = require('url')
const pathStatic = './index.html'

module.exports.get= (request, response, Db) => {
    let path = url.parse(request.url).pathname.split('/')
    switch (path[2]) {
        case undefined:
            fs.readFile('./index.html', (err, data) => {
                if (err) {throw err}
                response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8',})
                response.end(data)
            })
            break

        case 'faculties':
            Db.getFaculties()
                .then((records) => {
                    response.statusCode = 200
                    response.setHeader('Content-Type', 'application/json')
                    response.end(JSON.stringify(records.recordset))
                })
                .catch((error) => {error400(response, error)})
            break

        case 'pulpits':
            Db.getPulpits()
                .then((records) => {
                    response.statusCode = 200
                    response.setHeader('Content-Type', 'application/json')
                    response.end(JSON.stringify(records.recordset))
                })
                .catch((error) => {error400(response, error)})
            break

        case 'subjects':
            Db.getSubjects()
                .then((records) => {
                    response.statusCode = 200
                    response.setHeader('Content-Type', 'application/json')
                    response.end(JSON.stringify(records.recordset))
                })
                .catch((error) => {error400(response, error)})
            break

        case 'auditoriumstypes':
            Db.getAuditoriumTypes()
                .then((records) => {
                    response.statusCode = 200
                    response.setHeader('Content-Type', 'application/json')
                    response.end(JSON.stringify(records.recordset))
                })
                .catch((error) => {error400(response, error)})
            break

        case 'auditoriums':
            Db.getAuditoriums()
                .then((records) => {
                    response.statusCode = 200
                    response.setHeader('Content-Type', 'application/json')
                    response.end(JSON.stringify(records.recordset))
                })
                .catch((error) => {error400(response, error)})
            break

        default:
            let faсultypulp = /\/api\/faculty\/(\w+)\/pulpits/
            let audit =/\/api\/auditoriumtypes\/(\w+)\/auditoriums/
            if (audit.exec(url.parse(request.url).pathname)) {
                Db.getAuditoriumByType(audit.exec(url.parse(request.url).pathname)[1])
                    .then((records) => {
                        response.statusCode = 200
                        response.setHeader('Content-Type', 'application/json')
                        response.end(JSON.stringify(records.recordset))
                    })
                    .catch((error) => {error400(response, error)})
                break
            }
            if (faсultypulp.exec(url.parse(request.url).pathname)) {
                Db.getPulpitsByFaculty(faсultypulp.exec(url.parse(request.url).pathname)[1])
                    .then((records) => {
                        response.statusCode = 200
                        response.setHeader('Content-Type', 'application/json')
                        response.end(JSON.stringify(records.recordset))
                    })
                    .catch((error) => {error400(response, error)})
                break
            }
            error400(response, 'Invalid method')
            break
    }
}

let pipeFile = (response, headers) => {
    response.writeHead(200, headers)
    fs.createReadStream(pathStatic).pipe(response)
}

function error400(response, error) {
    response.statusCode = 400
    response.statusMessage = 'Invalid method'
    response.end(JSON.stringify({error: error.message}))
}