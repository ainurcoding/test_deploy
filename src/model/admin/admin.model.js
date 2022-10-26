const pool = require("../../config/db");

const adminModel = {
  register: (id, username, email, password, date) => {
    return pool.query(
      `
        INSERT INTO admins (admin_id, username, email, password, created_at)
        VALUES ($1, $2, $3, $4, $5)
        `,
      [id, username, email, password, date]
    );
  },

  emailCheck: (email) => {
    return pool.query(
      "SELECT * FROM admins WHERE email = $1",
      [email]
    );
  },
};

module.exports = adminModel;
