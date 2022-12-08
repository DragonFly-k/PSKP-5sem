const url = require('url')
const fs = require('fs')
const path = 'StudentList.json'

module.exports = (req, res) =>{
    let urll= url.parse(req.url).pathname

    switch (urll) {
        case '/':
            req.on('data', (data) => {
                let student = JSON.parse(data)
                let students = JSON.parse(fs.readFileSync(path).toString())
                let index = students.findIndex((x) => x.id === student.id)
                if (index === -1) { 
                    res.end( JSON.stringify({"error": 2, "message": "Студент с id равным "+ student.id+ " не найден"}) )
                    return
                }
                students[index] = student
                fs.writeFileSync(path, JSON.stringify(students))
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8',})
                res.end(JSON.stringify(student, null, '\t'))
            })
            break;
        default:
            res.writeHead(404)
            res.end()
            break;
    }
};