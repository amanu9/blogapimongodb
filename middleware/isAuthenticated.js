// const jwt = require('jsonwebtoken');

// const authenticate = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
  
//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }
  
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports=authenticate;




const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization
      ? req.headers.authorization.split(" ")
      : [];
    const token = authorization.length > 1 ? authorization[1] : null;

    if (token) {
      const payload = jwt.verify(token, jwtSecret);

      if (payload) {
        req.user = {
          _id: payload._id,
          name: payload.name,
          email: payload.email,
          role: payload.role,
        };
        next();
      } else {
        res.code = 401;
        throw new Error("Unauthorized");
      }
    } else {
      res.code = 400;
      throw new Error("Token is required");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
