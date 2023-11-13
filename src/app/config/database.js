const { createPool } = require("mysql2/promise");
const config = require("./config");

// Configuration for MySQL connection
const connectionConfig = {
  host: config.db.host,
  port: config.db.port,
  user: config.db.username,
  password: config.db.password,
  database: config.db.database,
};

class Database {
  constructor() {
    this.pool = createPool(connectionConfig);
  }

  async query(sql, values) {
    let connection = null;
    try {
      connection = await this.pool.getConnection();
      const [results] = await connection.query(sql, values);
      return results;
    } catch (error) {
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
}

module.exports = new Database();
