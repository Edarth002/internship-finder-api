import { register, login } from "../controllers/authController";
import express from "express";

const router = express.Router();

//route for registeration
router.post("register", register);

//route to login
router.post("/login", login);

export default router;
