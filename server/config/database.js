const mongoose = require("mongoose");
// avid strict mode for query
mongoose.set('strictQuery', false);

const dbUri = "mongodb://127.0.0.1:27017/pms";
const connectToDb = function () {
    mongoose
        .connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then((result) => {
            console.log('Connected')
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = connectToDb;