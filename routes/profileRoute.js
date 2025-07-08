import { getProfile, profileUpdate } from "../controllers/profileController";
import express from "express";

const router = express.Router();

router.post("/", profileUpdate);
router.get("/", getProfile);

export default router;
