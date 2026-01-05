import jwt from "jsonwebtoken";

const SECRET = "3450f25f280bbbbdf6f42880ac101e24";

const jwtAuth = (req, res, next) => {
  // 1. Read the Authorization header (Express lower-cases header names)
  const token = req.headers["authorization"];
  console.log(token);

  if (!token) {
    return res.status(401).send("Unauthorized: no token provided");
  }
  try {
    const payload = jwt.verify(token, SECRET);
    console.log(payload);
    req.userId=payload.userId;
    // attach payload to request for downstream handlers
  } catch (err) {
    return res.status(401).send("Unauthorized: invalid or expired token");
  }
  next();
};

export default jwtAuth;
