const { success, failed } = require("../../helper/response.helper");
const flightModel = require("../../model/user/flight.model");
const { v4: uuid } = require("uuid");

const flightModelController = {
  getFlight: (req, res) => {
    const dept_country = req.body.dept_country || "";
    const dept_city = req.body.dept_city || "";
    const arrv_country = req.body.arrv_country || "";
    const arrv_city = req.body.arrv_city || "";
    const min_price = req.body.min_price || 0;
    const max_price = req.body.max_price || 99999999;
    const transit = req.query.transit || null;

    let wifi = null;
    if (req.query.wifi) {
      wifi = req.query.wifi || true;
    }

    let lunch = null;
    if (req.query.lunch) {
      lunch = req.query.lunch || true;
    }

    let luggage = null;
    if (req.query.luggage) {
      luggage = req.query.luggage || true;
    }

    const sortBy = req.query.sortby || "recipe_id";
    const sortOrder = req.query.order || "asc";

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const searchData = {
      dept_country,
      dept_city,
      arrv_country,
      arrv_city,
      min_price,
      max_price,
      transit,
      wifi,
      lunch,
      luggage,
      sortBy,
      sortOrder,
      limit,
      offset,
    };

    flightModel
      .getFlight(searchData)
      .then((results) => {
        success(res, results.rows, "success", "success get data");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "internal server error");
      });
  },

  getFlightDetail: (req, res) => {
    const { id } = req.params;

    flightModel
      .getFlightDetail(id)
      .then((results) => {
        success(res, results.rows[0], "success", "success get data");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "internal server error");
      });
  },

  insertFlight: (req, res) => {
    const id = uuid();

    const data = {
      id,
      arrival_country: req.body.arrival_country,
      arrival_city: req.body.arrival_city,
      departure_country: req.body.departure_country,
      departure_city: req.body.departure_city,
      arrival_time: req.body.arrival_time,
      departure_time: req.body.departure_time,
      price: req.body.price,
      terminal: req.body.terminal,
      gate: req.body.gate,
      transit: req.body.transit,
      wifi: req.body.wifi,
      luggage: req.body.luggage,
      lunch: req.body.lunch,
    };

    flightModel
      .insertFlight(data)
      .then(() => {
        success(res, data, "flight data has been entered");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "internal server error");
      });
  },

  updateFlight: (req, res) => {
    const id = req.params.id;
    const date = new Date();

    const data = {
      id,
      date,
      arrival_country: req.body.arrival_country,
      arrival_city: req.body.arrival_city,
      departure_country: req.body.departure_country,
      departure_city: req.body.departure_city,
      arrival_time: req.body.arrival_time,
      departure_time: req.body.departure_time,
      price: req.body.price,
      terminal: req.body.terminal,
      gate: req.body.gate,
      transit: req.body.transit,
      wifi: req.body.wifi,
      luggage: req.body.luggage,
      lunch: req.body.lunch,
      airline_id: req.body.airline_id
    };

    flightModel
      .updateFlight(data)
      .then(async () => {
        const result = await flightModel.getFlightDetail(id);
        success(res, result.rows[0], "success", "data has been update");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "internal server error");
      });
  },

  deleteFlight: async (req, res) => {
    const id = req.params.id;

    const data = await flightModel.getFlightDetail(id);

    flightModel
      .deleteFlight(id)
      .then(() => {
        success(res, data.rows[0], "data has been deleted");
      })
      .catch((err) => {
        res.json(err);
      });
  },
};

module.exports = flightModelController;
