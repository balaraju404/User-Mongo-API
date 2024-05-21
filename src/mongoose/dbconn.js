import mongoose from "mongoose";

// const mongo_uri = process.env.MONGO_URL || "mongodb+srv://gandhambalaraju18:Balaraju%4018@cluster0.zresrux.mongodb.net/balaraju";
const mongo_uri = process.env.MONGO_URL || "mongodb://localhost:27017/balaraju";

mongoose.connect(process.env.MONGO_URL || 'mongodb+srv://gandhambalaraju18:Balaraju%4018@cluster0.zresrux.mongodb.net/balaraju')
    .then(() => {
        console.log("DB connected")
    }).catch((err) => {
        console.error("Error connecting to database:", err.message);
    });

