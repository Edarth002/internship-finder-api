import { PrismaClient } from "@prisma/client";
import { json } from "express";

const prisma = new PrismaClient();

export async function createApplication(req, res) {
  const userId = req.user.userId;
  const { title, company, location, url, status, appliedAt } = req.body;

  //Check if user has applied for this postion before
  const existing = await prisma.application.findFirst({
    where: { userId, title, company },
  });

  try {
    if (existing) {
      return res
        .status(400)
        .json({ message: "You have applied for this position already" });
    }

    //Since user has not applied, create application
    const application = await prisma.application.create({
      data: {
        title,
        company,
        location,
        url,
        status: status || "pending",
        appliedAt: appliedAt || new Date(),
        user: { connect: { id: userId } },
      },
    });

    res.status(201).json({
      message:
        "Application has been sent and created, you can visit dashboard to view all applications",
      application,
    });
  } catch (error) {
    console.log("Failed to POST application because:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//Get all the applications for a single user and order them based on appliedAt argument

export async function getApplications(req, res) {
  const userId = req.user.userId;

  try {
    const applications = await prisma.application.findMany({
      where: { userId },
      orderBy: {
        appliedAt: "desc",
      },
    });

    res.status(200).json({ applications });
  } catch (error) {
    console.log("Failed to GET applications because:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//It may be necessary to edit applications especially if user has been accepted or rejected, this code takes care of this

export async function updateApplication(req, res) {
  const userId = req.user.userId;
  const { id } = req.params;
  const { status } = req.body;

  try {
    const application = await prisma.application.findUnique({
      where: { id: parseInt(id) },
    });

    if (!application || application.userId !== userId) {
      return res.status(404).json({ message: "Application not found" });
    }

    const updatedApplication = await prisma.application.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    res.status(200).json({
      message: "Application updated",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//After an application has been rejected, user might intend to delete it, this part handles deletion

export async function deleteApplication(req, res) {
  const userId = req.user.userId;
  const { id } = req.params;

  try {
    const application = await prisma.application.findUnique({
      where: { id: parseInt(id) },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const deletedApplication = await prisma.application.delete({
      where: { id: parseInt(id) },
    });

    res
      .status(200)
      .json({ message: "Application has been successfully deleted" });
  } catch (error) {
    console.log("Delete Application Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
