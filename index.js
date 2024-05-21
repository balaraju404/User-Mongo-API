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

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
