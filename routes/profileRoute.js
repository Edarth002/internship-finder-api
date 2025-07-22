import { getProfile, profileUpdate } from "../controllers/profileController.js";
import express from "express";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, profileUpdate);
router.get("/", verifyToken, getProfile);

export default router;
