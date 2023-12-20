const jwtDecode = require("jwt-decode");
exports.getAuthorization = (req, res, next) => {
  const token =
    req.headers.authorization && req.header.authorization.split(" ")[1];
  const decodedToken = jwtDecode(token);
  if (!decodedToken) {
    res.status(401).json({ message: "Unauthorized Access" });
    return next(err);
  } else {
    req.body.decodedToken = decodedToken;
    next();
  }
};
