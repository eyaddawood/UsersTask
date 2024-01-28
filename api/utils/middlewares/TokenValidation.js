const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    // Verify the received token and verify the permission
    await jwt.verify(
      bearerToken,
      process.env.HASHKEY,
      async (err, decoded) => {
        if (err) {
          console.log("err")
          return res.status(403).send({ message: "Permission denied" });
        } else {
          next(); // If the flag is switched go to next middleware
        }
      }
    );
  } else {
    res.status(403).send({ message: "Permission denied" });
  }
};
