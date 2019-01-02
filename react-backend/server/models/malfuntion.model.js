const db = require("../config/mysql2");

module.exports = class Malfuntion {
  constructor(id, malfuntionID, studentID, bedNum, date, matter, desc, time) {
    this.id = id;
    this.malfuntionID = malfuntionID;
    this.studentID = studentID;
    this.bedNum = bedNum;
    this.date = date;
    this.matter = matter;
    this.desc = desc;
    this.time = time;
  }

  // READ
  static fetchAll() {
    return db.execute('SELECT * FROM malfuntion');
  }

  static findById(id) {
    return db.execute('SELECT * FROM malfuntion where id = ?', [id]);
  }

  // UPDATE
  static updateById(req, res) {
    const id = req.body.id;
    const malfuntionID = req.body.malfuntionID;
    const studentID = req.body.studentID;
    const bedNum = req.body.bedNum;
    const date = req.body.date;
    const matter = req.body.matter;
    const desc = req.body.desc;
    const time = req.body.time;
    //const date = new Date();
    console.log('model:updateById()', id, malfuntionID, studentID, bedNum, date, matter, desc, time)
    return db.execute(
      'UPDATE malfuntion SET malfuntionID = ?, studentID = ?, bedNum = ?, date = ?, matter = ?, desc = ?, time = ?, WHERE id = ?', [malfuntionID, studentID, bedNum, date, matter, desc, time, id]
    );
  }


  // DELETE
  static deleteById(id) {
    return db.execute(
      'DELETE FROM malfuntion WHERE id = ?', [id]
    );
  }


  static getCount() {
    return db.execute('SELECT COUNT(*) as count FROM post');
  }
};