/* eslint-disable camelcase */
const pool = require("../../config/db");

const userModel = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      const query = {
        text: `INSERT INTO users
                (   
                    user_id,
                    username,
                    email,
                    phone,
                    password
                )
                VALUES (
                    $1, $2, $3, $4, $5
                )`,
        values: [data.id, data.username, data.email, data.phone, data.password],
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users WHERE email='${email}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  getUser: () => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM users ORDER BY username ASC", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getUserDetail: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM users where user_id='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  updateUser: (data, avatar) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `
        UPDATE users SET
        username = COALESCE ($1, username),
        email = COALESCE ($2, email),
        phone = COALESCE ($3, phone),
        avatar = COALESCE ($4, avatar),
        city = COALESCE ($5, city),
        address = COALESCE ($6, address),
        postcode = COALESCE ($7, postcode),
        updated_at = $8
        WHERE user_id = $9
        `,
        [
          data.username,
          data.email,
          data.phone,
          avatar,
          data.city,
          data.address,
          data.postcode,
          data.date,
          data.id,
        ],
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  deleteUser: (user_id) => {
    return new Promise((resolve, reject) => {
      const query = {
        text: "DELETE FROM users WHERE user_id = $1",
        values: [user_id],
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};
module.exports = userModel;
