import { profileUpdate } from "../controllers/profileController";
import express from "express";

const router = express.Router();

router.post("/", profileUpdate);

export default router;
