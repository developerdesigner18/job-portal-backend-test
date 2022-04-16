import { UserInfo } from "../api/user-info/user-info.model.js";
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import { appConfig } from "../config/index.js"

var config = appConfig();


//token generation
const expirationInterval =
  (config.NODE_ENV === "development") ? 30 * 24 * 60 * 60 : (parseInt(config.JWT_SECRET) || 1) * 24 * 60 * 60;

const tokenForUser = (user) => {
  try {
    const timestamp = new Date().getTime();
    return jwt.sign(
      {
        sub: user.emailId,
        iat: timestamp,
        // entityDetails: loginDetails.relatedFaEntities[0],
        exp: Math.floor(Date.now() / 1000) + expirationInterval
      },
      config.JWT_SECRET
    );
  }
  catch (err) {
    throw err;
  }
};

// signin api
export const signin = async (req, res) => {
    const { email } = req.body;
    try {
      const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const mobileNoRegexp = /\(?\d{3}\)?-? *\d{3}-? *-?\d{6}/;
      if (emailRegexp.test(email)) {
        const userExistence = await UserInfo.findOne({ emailId: email.toLowerCase() }, { password: 0 })
        if (userExistence) {
          res.status(200).send({
            success: true,
            token: tokenForUser(userExistence),
            data: userExistence,
            message: 'user successfully logged in'
          });
        }
      }
    //   else if (mobileNoRegexp.test(email)) {
    //     const userExistence = await UserInfo.findOne({ mobileNo: email })
    //     if (userExistence) {
    //       res.status(200).send({
    //         success: true,
    //         token: tokenForUser(userExistence),
    //         data: userExistence
    //       });
    //     }
    //   }
    }
    catch (err) {
      res.status(422).send({
        success: false,
        error: `Unable to Login using email - ${email}`
      });
    }
  }
  