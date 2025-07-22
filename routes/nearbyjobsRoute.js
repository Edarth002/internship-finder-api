import { getNearbyJobs } from "../controllers/nearbyjobsController";
import express from "express";
import verifyToken from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", verifyToken, getNearbyJobs);

export default router;
