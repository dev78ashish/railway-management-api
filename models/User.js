const database = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(username, email, password, role = 'USER') {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await database.promise().query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, role]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await database.promise().query(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );
    return rows[0];
  }
}

module.exports = User;