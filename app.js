import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoute.js";

dotenv.config();
const app = express();
const PORT = 3000;

//middleware to handle application/json and
app.use(cors());
app.use(express.json());

//Routes to register or login
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Internship Finder API is running 🎯");
});

app.listen(PORT, () => {
  console.log("App is up and running");
});
