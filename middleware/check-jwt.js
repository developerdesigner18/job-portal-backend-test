//Middle ware file using JSON Web Token for authentication
import jwt from "jsonwebtoken";
import { appConfig } from "../config/index.js"
var config = appConfig();

export const checkJWT = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, config.JWT_SECRET, function(err, decoded) {
      if (err) {
        console.log('err', err)
        res.json({
          success: false,
          message: 'Failed to authenticate token'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).json({
      success: false,
      message: 'No token provided'
    });
  }
}