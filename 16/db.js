const mysql = require("mysql2");
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nj',
  password: '123456',
  connectionLimit:"10",
}).promise();

function DB(cb) {
  this.getFullTable = async (tableName) => {
    const [rows, fields] = await pool.execute(`SELECT * FROM ${tableName} `);
    return rows;
  };

  this.getOneRecord = async (tableName, value) => {
    const [rows, fields] = await pool.execute(`SELECT * FROM ${tableName} where ${tableName} = ?`, [value]);
    return rows;
  };

  this.deleteOneRecord = async (tableName, value) => {
    const [rows, fields,] = await pool.execute(`delete from ${tableName} where ${tableName} = ?`, [value]);
    return rows.affectedRows != 0;//возвращаем true если удаление прошло успешно
  };

  this.insertOneRecord = async (tableName, args) => {
    let keys = Object.keys(args); //это массив ключей объекта нужно для формирования запроса
    let values = Object.values(args); //это массив значений объекта нужно для формирования запроса
    //формируем запрос на вставку данных в таблицу с именем tableName и вставляем в него массив ключей и массив значений объекта
    let query = `insert into ${tableName} (${keys.join(",")}) values (${values.map((v) => "?").join(",")})`; 
    await pool.execute(query, values);
    //возвращаем только что вставленную запись из таблицы
    const [rows, fields2,] = await pool.execute(`SELECT * FROM ${tableName} where ${tableName} = ?`, [args[tableName]]);
    return rows[0];
  };

  this.updateOneRecord = async (tableName, args) => {
    let updateComponent = "";
    const keys = Object.keys(args); //это массив ключей объекта нужно для формирования запроса
    const values = Object.values(args); //это массив значений объекта нужно для формирования запроса
    for (let i = 0; i < keys.length; i++) {  //формируем строку для запроса на обновление данных в таблице
      updateComponent += `${keys[i]} = '${values[i]}', `; 
    }
    updateComponent = updateComponent.slice(0, -2); //обрезаем последние 2 символа в строке
    let sqlToUpd = `update ${tableName} set ${updateComponent} where ${tableName} = ?`; //формируем запрос на обновление данных в таблице
    await pool.execute(sqlToUpd, [args[tableName]]); //выполняем запрос на обновление данных в таблице

    let sqlToSel =`SELECT * FROM ${tableName} where ${tableName} = ?`; //формируем запрос на выборку данных из таблицы
    const [rows, fields2,] = await pool.execute(sqlToSel, [args[tableName]]); //выполняем запрос на выборку данных из таблицы
    return rows[0]??null; //возвращаем только что обновленную запись из таблицы
    }


    this.getTeachersByFaculty = async (args, context) => {
      const [rows, fields,] = await pool.query(`select TEACHER.*,P.FACULTY,P.FACULTY from TEACHER join PULPIT P on P.PULPIT = TEACHER.PULPIT where P.FACULTY = ?`, [args.FACULTY]);
      let dataToReturn = [];
      rows.forEach((item) => {
        dataToReturn.push({
          FACULTY: item.FACULTY,
          TEACHERS: [{TEACHER: item.TEACHER,TEACHER_NAME: item.TEACHER_NAME,PULPIT: item.PULPIT,}]
        })
      });
      return dataToReturn;
    };

    this.getSubjectsByFaculties = async (args, context) => {
      const [rows, fields] = await pool.query(`select SUBJECT.*, PULPIT.PULPIT_NAME, PULPIT.FACULTY from SUBJECT join PULPIT on SUBJECT.PULPIT = PULPIT.PULPIT join FACULTY on PULPIT.FACULTY = FACULTY.FACULTY where FACULTY.FACULTY = ?`, [args.FACULTY]);
      let dataToReturn = [];
      rows.forEach((item) => {
        dataToReturn.push({
          FACULTY: item.FACULTY,
          PULPIT: item.PULPIT,
          PULPIT_NAME: item.PULPIT_NAME,
          SUBJECTS: [{SUBJECT: item.SUBJECT,SUBJECT_NAME: item.SUBJECT_NAME,PULPIT: item.PULPIT,}]
        })
      });
      return dataToReturn;
    };
}

exports.DB = (cb) => new DB(cb);
