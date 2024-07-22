const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/";
async function initialize_mongo_connectivity() {
    console.warn("Mongo Db connectivity initialised");
    try {
        const response = await mongoose.connect(URI, {
            dbName: "taskify"
        });
        console.log("Mongo Db connectivity success");
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    initialize_mongo_connectivity
}