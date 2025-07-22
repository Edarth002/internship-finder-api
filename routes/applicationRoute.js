import {
  updateApplication,
  createApplication,
  getApplications,
  deleteApplication,
} from "../controllers/applicationController.js";

import verifyToken from "../middleware/authMiddleware.js";

import express from "express";

const router = express.Router();

//Route to post applications
router.post("/", verifyToken, createApplication);

//Route to get applications
router.get("/", verifyToken, getApplications);

//Route to update applications
router.patch("/:id/status", verifyToken, updateApplication);

//Route to delete applications
router.delete("/:id", verifyToken, deleteApplication);

export default router;
