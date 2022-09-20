const util = require('util');   // inherits
const ee = require('events');   // EventEmitter

let db_data = [
    { id: 1, name: 'Katty', bday: '20-04-2003' },
    { id: 2, name: 'Vera',  bday: '17-07-2002' },
    { id: 3, name: 'Lera',  bday: '31-12-2002' },
    { id: 4, name: 'Tonya', bday: '09-07-2002' }
];

function DB() {
    this.get = () => {return db_data;};   //реализация GET
    this.post = row => {db_data.push(row);};  //реализация POST
    this.delete = row => {
        let ind = db_data.findIndex(item => item.id == row);
        let data = db_data[ind];
        db_data.splice(ind, 1);
        console.log(ind);
        return data;
    };
    this.put = row => {
        let ind = db_data.findIndex(item => item.id == row.id);
        return db_data.splice(ind, 1, row);
    }
}

util.inherits(DB, ee.EventEmitter); //DB наследует EventEmmiter
exports.DB = DB;  //экспортируется объект DB