import { getNearbyJobs } from "../controllers/nearbyjobsController.js";
import express from "express";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getNearbyJobs);

export default router;
