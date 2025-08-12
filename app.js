import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import profileRoute from "./routes/profileRoute.js";
import applicationRoute from "./routes/applicationRoute.js";
import nearbyjobsRoute from "./routes/nearbyjobsRoute.js";

dotenv.config();
const app = express();
const PORT = 3000;

//middleware to handle application/json and
app.use(cors());
app.use(express.json());

//Routes to register or login
app.use("/api/auth", authRoute);

//Route to create and get profile
app.use("/api/profile", profileRoute);

//Route to applications in order of crud(create, read/get, update, delete) operations
app.use("/api/applications", applicationRoute);

//Route to get nearbyjobs
app.use("/api/nearbyjobs", nearbyjobsRoute);

//Default/Home Route
app.get("/", (req, res) => {
  res.send("Internship Finder API is running");
});

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Server running on port ${PORT}`);
});
