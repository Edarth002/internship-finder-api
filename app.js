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

// --- CORS configuration for local and deployed frontend ---
const allowedOrigins = [
  "http://localhost:3000",             
  "https://internship-finder.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
  })
);

// Middleware to handle JSON
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api/applications", applicationRoute);
app.use("/api/nearbyjobs", nearbyjobsRoute);

// Default/Home Route
app.get("/", (req, res) => {
  res.send("Internship Finder API is running");
});

// Start server
app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Server running on port ${PORT}`);
});
