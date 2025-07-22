import { getProfile, profileUpdate } from "../controllers/profileController";
import express from "express";
import verifyToken from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", verifyToken, profileUpdate);
router.get("/", verifyToken, getProfile);

export default router;
