const jwt = require("jsonwebtoken");
require("dotenv").config();

// Formate of token ==> bearerHeader = [Bearer ,token]
// Authorization: Bearer <access_token>

const verifyToken = function (request, response, next) {
  const bearerHeader = request.headers["authorization"];
  const token = bearerHeader && bearerHeader.split(" ")[1];
  if (token === null) {
    return response.status(401).send("You need to login");
  }

  jwt.verify(token, process.env.ACCSEES_TOKEN_SECRET, (error, user) => {
    if (error) {
      return response.status(403).send("You need to login"); // token not valied any more
    } else {
      request.user = user;
    }
  });

  next();
};

module.exports = { verifyToken };
