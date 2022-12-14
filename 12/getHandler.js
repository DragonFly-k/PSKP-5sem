const url = require('url')
const fs = require('fs')
const path = 'StudentList.json'

module.exports = (req, res) =>{
    let urll= url.parse(req.url).pathname

    switch (urll) {
        case '/':
            let file = fs.readFileSync(path)
            let students = JSON.parse(file.toString())
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(students, null, '\t'))
            break;
        case '/backup':
            let files = fs.readdirSync('./backup')
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(files))
            break;
        default:
            if (urll.match(/\/(\d+)$/)) {
                let file = fs.readFileSync(path)
                let students = JSON.parse(file.toString())
                let student = students.filter((student) => {return student.id === Number(urll.match(/\/(\d+)$/)[1])})
                if (student.length === 0) {
                    res.writeHead(404)
                    res.end( JSON.stringify({"error": 2, "message": "Студент с id равным "+urll.match(/^\/(\d+)$/)[1]+ " не найден"}) )
                    break;
                }
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8',})
                res.end(JSON.stringify(student))
                break;
            }
            res.writeHead(404)
            res.end('ERROR')
            break;
    }
};