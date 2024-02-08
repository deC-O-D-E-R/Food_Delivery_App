const mongoose = require("mongoose");
const mongoURL = 'mongodb://127.0.0.1:27017/GoFood';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURL).then(() => {
            console.log("mongodb is connected");
        });

        const db = mongoose.connection.db;
        const sani = db.collection('FoodItem');
        const data = await sani.find({}).toArray();
        //console.log(data);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

mongoDB();

module.exports = mongoDB;
