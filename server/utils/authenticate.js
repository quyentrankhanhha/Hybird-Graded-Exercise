const jwt = require("jsonwebtoken");

// authentication middle
module.exports = function(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    // verify token
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    // attach token to request
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
