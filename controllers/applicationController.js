import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createApplication(req, res) {
  const { title, company, location, url, status, appliedAt } = req.body;

  try {
    const application = await prisma.application.create({
      data: {
        title,
        company,
        location,
        url,
        status,
        appliedAt,
      },
    });

    res.status(201).json({
      message:
        "Application has been sent and created, you can visit dashboard to view all applications",
      applications: application,
    });
  } catch (error) {
    console.log("Failed to create application because:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getApplications(req, res) {
  const userId = req.user.userId;

  try {
    const applications = await prisma.user.findUnique({
      where: { id: userId },
      select: {},
    });
  } catch (error) {}
}
