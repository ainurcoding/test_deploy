const pool = require("../../config/db");

const flightModel = {
  getFlight: (data) => {
    return new Promise((resolve, reject) => {
      let query = {
        text: `
        SELECT * FROM flights WHERE 
        departure_country ILIKE '%${data.dept_country}%'
        AND departure_city ILIKE '%${data.dept_city}%'
        AND arrival_country ILIKE '%${data.arrv_country}%'
        AND arrival_city ILIKE '%${data.arrv_city}%'
        AND (price >= ${data.min_price} AND price <= ${data.max_price})
        `,
      };

      if (data.transit) {
        query.text = query.text + " " + `AND transit = ${data.transit}`;
      }

      if (data.wifi) {
        query.text = query.text + " " + ` AND wifi = ${data.wifi}`;
        console.log("nambah wifi");
        console.log(query);
      }

      if (data.lunch) {
        query.text = query.text + " " + ` AND lunch = ${data.lunch}`;
        console.log("nambah lunch");
        console.log(query);
      }

      if (data.luggage) {
        query.text = query.text + " " + ` AND luggage = ${data.luggage}`;
      }

      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  
  getFlightDetail: (id) => {
    return new Promise((resolve, reject) => {
      const query = {
        text: `
        SELECT flights.*, airlines.* FROM flights JOIN airlines USING (airline_id) WHERE flight_id = '${id}'
        `,
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  insertFlight: (data) => {
    return new Promise((resolve, reject) => {
      const query = {
        text: `INSERT INTO flights
                        (   
                            flight_id,
                            arrival_country, arrival_city, 
                            departure_country, departure_city,
                            arrival_time, departure_time, price, 
                            terminal, gate, transit, wifi, luggage, lunch
                        )
                        VALUES (
                            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
                        )`,
        values: [
          data.id,
          data.arrival_country,
          data.arrival_city,
          data.departure_country,
          data.departure_city,
          data.arrival_time,
          data.departure_time,
          data.price,
          data.terminal,
          data.gate,
          data.transit,
          data.wifi,
          data.luggage,
          data.lunch,
        ],
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  updateFlight: (data) => {
    return new Promise((resolve, reject) => {
      const query = {
        text: `UPDATE flights SET
                    arrival_country = COALESCE($1, arrival_country),
                    arrival_city = COALESCE($2, arrival_city),
                    departure_country = COALESCE($3, departure_country),
                    departure_city  = COALESCE($4, departure_city),
                    arrival_time = COALESCE($5, arrival_time),
                    departure_time = COALESCE($6, departure_time),
                    price = COALESCE($7, price),
                    terminal = COALESCE($8, terminal),
                    gate = COALESCE($9, gate),
                    transit = COALESCE($10, transit),
                    wifi = COALESCE($11, wifi),
                    luggage = COALESCE($12, luggage),
                    lunch = COALESCE($13, lunch),
                    airline_id = COALESCE($14, airline_id),
                    updated_at = $15
                    WHERE flight_id = $16`,
        values: [
          data.arrival_country,
          data.arrival_city,
          data.departure_country,
          data.departure_city,
          data.arrival_time,
          data.departure_time,
          data.price,
          data.terminal,
          data.gate,
          data.transit,
          data.wifi,
          data.luggage,
          data.lunch,
          data.airline_id,
          data.date,
          data.id,
        ],
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  deleteFlight: (id) => {
    return new Promise((resolve, reject) => {
      const query = {
        text: "DELETE FROM flights WHERE flight_id = $1",
        values: [id],
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

module.exports = flightModel;
