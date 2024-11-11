const mongoose = require("mongoose");


main().then(
    console.log("mongodb is connected")
).catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGO_DB_KEY);
}