const fs = require("fs");
const userModel = require("../model/user/user.model");

const removeUser = async (req, res, next) => {
  const id = req.params.user_id;
  const data = await userModel.selectDetail(id);
  if (data.rows[0].avatar) {
    const avatar = data.rows[0].avatar;
    fs.unlink(`./public/${avatar}`, (err) => {
      if (err) {
        console.log(err);
        next();
      }
    });
    next();
  } else {
    res.json("Not found image");
  }
};

module.exports = removeUser;