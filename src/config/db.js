const mongoose = require("mongoose");

async function connectDB() {
    try {
        const uri = `mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`;
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("DB connected successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;
