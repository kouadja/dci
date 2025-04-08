require('dotenv').config();
const mysql = require('mysql2');

let instance = null;


// Singleton Pattern
class Database {
  constructor() {
    if (instance) {
      return instance;
    }

    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    this.connection.connect((err) => {
      if (err) {
        console.error('❌ Erreur de connexion à MySQL:', err);
      } else {
        console.log('✅ Connecté à la base de données MySQL');
      }
    });

    instance = this;
  }

  query(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  getConnection() {
    return this.connection;
  }
}

module.exports = new Database();
