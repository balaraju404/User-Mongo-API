import mongoose from "mongoose";

// const mongo_uri = process.env.MONGO_URL || "mongodb+srv://gandhambalaraju18:Balaraju%4018@cluster0.zresrux.mongodb.net/balaraju";
const mongo_uri = process.env.MONGO_URL || "mongodb://localhost:27017/balaraju";

mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connected!");
}).catch((error) => {
    console.log("DB Connection Failed! and error is : ", error);
});
