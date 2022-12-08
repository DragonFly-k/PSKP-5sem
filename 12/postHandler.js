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
                let check = students.filter((item) => { return item.id === student.id})
                if (check.length > 0) {
                    res.writeHead(400)
                    res.end( JSON.stringify({"error": 3, "message": "Студент с id равным "+student.id+ " уже есть"}) )
                    return
                }
                students.push(student)
                fs.writeFileSync(path, JSON.stringify(students))
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8',})
                res.end(data)
            })
            break;
        case '/backup':
            let date = new Date()
            let result = date.toISOString().match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):\d{2}:(\d{2}).+$/)
            let newPath = `${result[1]}${result[2]}${result[3]}${result[4]}${result[5]}_${path}`
            if (fs.existsSync(newPath)) {
                res.end('file already exists')
                break;
            }
            setTimeout(() => {
                fs.copyFileSync(path, newPath)
                res.end('OK')
            }, 2000)
            break;
    }
};