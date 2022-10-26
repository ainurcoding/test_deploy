const jwt = require("jsonwebtoken");
const { failed } = require("../helper/response.helper");

module.exports = (req, res, next) => {
  try {
    const { token } = req.headers;
    const decode = jwt.verify(token, process.env.SECRET_KEY_JWT);
    // console.log(decode);
    // next();

    req.APP_DATA = {
      tokenDecode: decode,
    };

    next();
  } catch (e) {
    failed(res, e, "failed", "invalid token");
  }
};
