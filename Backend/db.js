const mongoose = require("mongoose");
const mongoURL = 'mongodb://127.0.0.1:27017/GoFood';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURL).then(() => {
            console.log("mongodb is connected");
        });

        const db = mongoose.connection.db;
        const xyz = db.collection('FoodItem');
        const data1 = await xyz.find({}).toArray();

        const abc = db.collection('FoodCategory');
        const data2 = await abc.find({}).toArray();

        global.food_items = data1;
        global.foodCategory = data2;
        // console.log(global.food_category);

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

mongoDB();

module.exports = mongoDB;
