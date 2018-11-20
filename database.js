const mysql = require('mysql');

const configLocal = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mentorly',
};

const config = {
  host: 'sql.mit.edu',
  user: 'jesteban',
  password: 'mentorly2018',
  database: 'jesteban+mentorly',
};

class Database {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  query(sql) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, (err, rows) => {
        if (err) { return reject(err); }
        resolve(rows);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) { return reject(err); }
        resolve();
      });
    });
  }

  async createTables() {
    await this.query(`CREATE TABLE IF NOT EXISTS users(
      id INT PRIMARY KEY AUTO_INCREMENT, 
      email varchar(50),
      first_name varchar(50),
      last_name varchar(50),
      password varchar(100)
      );`
    ).catch(err => console.log(err));


    await this.query(`CREATE TABLE IF NOT EXISTS skills(
      id INT PRIMARY KEY AUTO_INCREMENT,
      name varchar(50),
      category varchar(50)
      );`
    ).catch(err => console.log(err));

    await this.query(`CREATE TABLE IF NOT EXISTS userSkills(
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id int references users(id),
      skill_id int references skills(id)
      );`
    ).catch(err => console.log(err));

    await this.query(`CREATE TABLE IF NOT EXISTS matches(
      id INT PRIMARY KEY AUTO_INCREMENT,
      mentee_id int references users(id),
      mentor_id int references users(id),
      skill_id int references skills(id),
      active bool
      );`
    ).catch(err => console.log(err));

    
  }

  // Prefill a small number of skills.
  async fillSkillsTable() {
    let skills = [
      ['6.170', 'Classes'],
      ['6.172', 'Classes'],
      ['6.031', 'Classes'],
      ['6.0001', 'Classes'],
      ['6.843', 'Classes'],
      ['6.842', 'Classes'],
      ['6.383', 'Classes'],
      ['6.009', 'Classes'],
      ['6.004', 'Classes'],
    ]

    for (let i = 0; i < skills.length; i++) {
      let skill = skills[i][0];
      let category = skills[i][1];
      await this.query('INSERT INTO skills (name, category) '
        + `VALUES ('${skill}', '${category}')`)
        .catch((err) => { console.log(err); throw err; });
    }
  }

  async fillUsersTable() {
    for (let i = 1; i < 100; i++) {
      try {
        const sql = `INSERT INTO users (email, first_name, last_name, password ) VALUES` +
        `('${String(i) + '@mit.edu'}', '${String(i)}', '${String(i*2)}', '${String(i**2)}');`;
        const response = await database.query(sql);
      } catch (err) { throw err; }
    }
  }
  async fillUsersSkillsTable() {
    // TODO: Prepopulate users and their skills for testing
    /**
     * await this.query(`CREATE TABLE IF NOT EXISTS userSkills('
      user_id int references users(id),
      skill_id int references skills(id)`
     */

    for (let i = 1; i < 100; i++) {
      let name = i
      let skills = [
        ['6.170', 'Classes'],
        ['6.172', 'Classes'],
        ['6.031', 'Classes'],
        ['6.0001', 'Classes'],
        ['6.843', 'Classes'],
        ['6.842', 'Classes'],
        ['6.383', 'Classes'],
        ['6.009', 'Classes'],
        ['6.004', 'Classes'],
      ]
      let skill = (i % skills.length) + 1;
      await this.query('INSERT INTO userSkills (user_id, skill_id) '
        + `VALUES ('${name}', '${skill}')`)
        .catch((err) => { console.log(err); throw err; });
    }
  }

  /* Used for testing */
  async clearTables() {
    await this.query('TRUNCATE TABLE users');
    await this.query('TRUNCATE TABLE skills');
    await this.query('TRUNCATE TABLE userSkills');
    await this.query('TRUNCATE TABLE matches');
  }
}

const database = new Database(config);

module.exports = database;