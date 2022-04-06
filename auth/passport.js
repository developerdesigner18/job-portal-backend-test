import { ExtractJwt } from 'passport-jwt'
import { UserInfo } from '../api/user-info/user-info.model.js'
import bcrypt from 'bcrypt-nodejs'
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
import { appConfig } from "../config/index.js"
import passport from "passport";

// import LocalStrategy from "passport-local";
// import JwtStrategy from "passport-jwt";

const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;

var config = appConfig();


const localOptions = {
    usernameField: "email",
    passwordField: "password"
  };

const localLogin = new LocalStrategy(
    localOptions,
    async (email, password, done)=>{
        try{
            console.log(email, password);
            const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const mobileNoRegexp = /\(?\d{3}\)?-? *\d{3}-? *-?\d{6}/;
            if(emailRegexp.test(email)){
                const userExistence = await UserInfo.findOne({emailId: email.toLowerCase()})
                if(!userExistence){
                    return done("User Doesn't Exist.", false);
                }
                const validPassword = await bcrypt.compareSync(password, userExistence.password);
                //console.log(validPassword)
                if(!validPassword){
                    return done("Password is Incorrect. Please try Again with Correct Credentials.", false);
                }
                return done(null, userExistence);
            } else { return done("Please enter a valid e-mail address.", false); }

            // else if(mobileNoRegexp.test(email)){
            //     const userExistence = await UserInfo.findOne({mobileNo: email})
            //     //console.log(userExistence)
            //     if(!userExistence){
            //         return done("Either Password or EmailId Doesn't match",false);
            //     }
            //     const validPassword = await bcrypt.compareSync(password, userExistence.password);
            //     if(!validPassword){
            //         return done("Password is Incorrect Please try Again later",false);
            //     }
            //     return done (null,userExistence);
            // }
        }
        catch(err){
            return done("System was unable to process the details.", false);
        }
    }
)

passport.use(localLogin);

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: config.JWT_SECRET
}

const jwtLogin = new JwtStrategy(jwtOptions, (jwt_payload, done)=>{
    UserInfo.findOne({emailId: jwt_payload.sub},
        (err, user)=>{
            if(err){
                return done(err.message, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
    })
})

passport.use(jwtLogin);