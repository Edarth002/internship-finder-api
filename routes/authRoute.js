import { register, login } from "../controllers/authController";
import express from "express";

const router = express.Router();

//route for registeration
router.post("/auth/register", register);

//route to login
router.post(".auth/login", login);

export default router;
