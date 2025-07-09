import {
  updateApplication,
  createApplication,
  getApplications,
  deleteApplication,
} from "../controllers/applicationController.js";

import express from "express";

const router = express.Router();

//Route to post applications
router.post("/", createApplication);

//Route to get applications
router.get("/", getApplications);

//Route to update applications
router.patch("/:id/status", updateApplication);

//Route to delete applications
router.delete("/:id", deleteApplication);

export default router;
