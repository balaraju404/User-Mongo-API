import express from "express";
import "./src/mongoose/dbconn.js";
import cors from 'cors'
import router from "./src/routers/userrouting.js";

const app = express();

// Set up CORS middleware
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Set up your routes
app.use(router);

// Custom CORS headers middleware
app.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.listen(3001, () => {
    console.log("Server is running on port 3000");
});
