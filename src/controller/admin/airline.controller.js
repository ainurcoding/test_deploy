const createError = require("http-errors");
const { v4: uuid } = require("uuid");
const { success } = require("../../helper/response.helper");

const airlineModel = require("../../model/admin/airline.model");

const airlineController = {
  insertAirline: async (req, res, next) => {
    try {
      const id = uuid();
      const { name } = req.body;
      const logo = req.file.filename;

      await airlineModel.insertAirline(id, logo, name);

      success(res, { id, name, logo }, "success", "insert airline success");
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getAirline: async (req, res, next) => {
    try {
      const data = await airlineModel.getAirline();

      success(res, data.rows, "success", "get all airline success");
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getAirlineDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      const data = await airlineModel.getAirlineDetail(id);

      success(res, data.rows[0], "success", "get airline detail success");
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  updateAirline: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      let logo;
      const date = new Date();

      if (req.file) {
        logo = req.file.filename;
      }

      const data = await airlineModel.getAirlineDetail(id);
      const oldName = data.rows[0].name;

      await airlineModel.updateAirline(id, logo, name, date);
      const result = await airlineModel.getAirlineDetail(id);

      success(
        res,
        result.rows[0],
        "success",
        `${oldName} updated to ${result.rows[0].name}`
      );
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  removeAirline: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await airlineModel.getAirlineDetail(id);
      const name = data.rows[0].name;

      await airlineModel.removeAirline(id);

      success(res, data.rows[0], "success", `${name} deleted`);

    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = airlineController;
