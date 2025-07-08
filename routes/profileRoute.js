import { profileUpdate } from "../controllers/profileController";
import express from "express";

const router = express.Router();

router.get("/", profileUpdate);

export default router;
