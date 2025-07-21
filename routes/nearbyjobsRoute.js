import { getNearbyJobs } from "../controllers/nearbyjobsController";
import express from "express";

const router = express.Router();

router.get("/", getNearbyJobs);

export default router;
