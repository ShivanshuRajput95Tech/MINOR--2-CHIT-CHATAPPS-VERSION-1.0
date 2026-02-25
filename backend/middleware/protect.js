const jwt = require("jsonwebtoken");

async function protect(req) {
  return new Promise((resolve, reject) => {
    const token = req.cookies?.authToken;

    if (!token) {
      return reject("No token provided");
    }

    jwt.verify(token, process.env.JWTPRIVATEKEY, {}, (err, userData) => {
      if (err) {
        return reject("Invalid or expired token");
      } else {
        return resolve(userData);   // userData = decoded JWT payload
      }
    });
  });
}

module.exports = protect;