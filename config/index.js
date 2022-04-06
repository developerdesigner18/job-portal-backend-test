// require("dotenv").config()
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const env = require("../env.json") // use the require method


// let appConfig;

// exports.appConfig = function() {
//     var node_env = process.env.NODE_ENV || 'development';
//     return env[node_env];
//   };

// appConfig = {
//     jwt: {
//         JWT_EXPIRE: process.env.JWT_EXPIRE,
//         JWT_SECRET: process.env.JWT_SECRET
//     },
//     db: {
//         DB_URL: process.env.DB_URL
//     },
//     port: {
//         PORT: process.env.PORT
//     }
// }

export const appConfig = () => {
    let node_env = (process.env.NODE_ENV || 'development').trim();
    return env[node_env];
  };

// export default appConfig;
// module.exports = appConfig;