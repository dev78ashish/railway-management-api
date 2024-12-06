const database = require('../config/database');

class Train {
  static async create(name, source, destination, totalSeats) {
    const [result] = await database.promise().query(
      'INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)',
      [name, source, destination, totalSeats, totalSeats]
    );
    return result.insertId;
  }

  static async findByRoute(source, destination) {
    const [rows] = await database.promise().query(
      'SELECT * FROM trains WHERE source = ? AND destination = ?',
      [source, destination]
    );
    return rows;
  }
}

module.exports = Train;