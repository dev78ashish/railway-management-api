const database = require('../config/database');

class Booking {
  static async create(userId, trainId) {
    const connection = await database.promise().getConnection();
    
    try {
      // Start transaction for race condition handling
      await connection.beginTransaction();

      // Check seat availability with row-level locking
      const [trains] = await connection.query(
        'SELECT * FROM trains WHERE id = ? AND available_seats > 0 FOR UPDATE',
        [trainId]
      );

      if (trains.length === 0) {
        await connection.rollback();
        return null;
      }

      // Decrease available seats
      await connection.query(
        'UPDATE trains SET available_seats = available_seats - 1 WHERE id = ?',
        [trainId]
      );

      // Create booking
      const [bookingResult] = await connection.query(
        'INSERT INTO bookings (user_id, train_id) VALUES (?, ?)',
        [userId, trainId]
      );

      // Commit transaction
      await connection.commit();

      return bookingResult.insertId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async getUserBookings(userId) {
    const [rows] = await database.promise().query(
      `SELECT b.id, t.name, t.source, t.destination 
       FROM bookings b 
       JOIN trains t ON b.train_id = t.id 
       WHERE b.user_id = ?`,
      [userId]
    );
    return rows;
  }
}

module.exports = Booking;