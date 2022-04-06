import mongoose from "mongoose";
// import appConfig from "./index.js"
import colors from "colors";

mongoose.Promise = global.Promise;

const connect = (config = appConfig) => {
    mongoose.connect(
        appConfig.db.DB_URL,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    )
    .then(() => {
        console.log('DB Connected Successfully!'.green.inverse)
    })
    .catch((err) => {
        console.log(`Error: ${err}`.red.inverse);
    })
}

module.exports = connect;