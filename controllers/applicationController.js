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
      res
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
