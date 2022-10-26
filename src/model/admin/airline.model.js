const pool = require("../../config/db");

const airlineModel = {
  insertAirline: (id, logo, name) => {
    return pool.query(
      `INSERT INTO airlines (airline_id, logo, name)
        VALUES ($1, $2, $3)`,
      [id, logo, name]
    );
  },

  getAirline: () => {
    return pool.query("SELECT * FROM airlines");
  },

  getAirlineDetail: (id) => {
    return pool.query(`SELECT * FROM airlines WHERE airline_id = '${id}'`);
  },

  updateAirline: (id, logo, name, date) => {
    return pool.query(
      "UPDATE airlines SET logo = COALESCE ($1, logo), name = COALESCE ($2, name), updated_at = $3 WHERE airline_id = $4",
      [logo, name, date, id]
    );
  },

  removeAirline: (id) => {
    return pool.query(`DELETE FROM airlines WHERE airline_id = '${id}'`);
  },
};

module.exports = airlineModel;
