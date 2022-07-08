const mongoose = require ("mongoose");

const dbConnect = () => {
    const connectionParams = { useNewUrlParser: true };
    mongoose.connect(process.env.DB, connectionParams);

    mongoose.connection.on("error", (err) => {
        console.log("Database connection error :" + err);
    });
    mongoose.connection.on("disconnected", () => {
        console.log("You disconnecred from database");
    });
};

module.exports = dbConnect;