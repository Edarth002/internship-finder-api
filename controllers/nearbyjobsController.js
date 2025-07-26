import allJobs from "../utils/jobAPI.js";
import { matchJobs } from "../utils/matchJobs.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getNearbyJobs(req, res) {
  try {
    const { userId } = req.user;

    // Get full user details including latitude and longitude to be used in the matchJos function
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        longitude: true,
        latitude: true,
      },
    });

    if (!user || !user.latitude || !user.longitude) {
      return res.status(400).json({
        message: "User location not set. Please update your profile.",
      });
    }

    //You’ll build this to get job listings
    const jobs = await allJobs();

    const nearbyJobs = matchJobs(
      parseFloat(user.latitude),
      parseFloat(user.longitude),
      jobs,
      50000 // 50km
    );

    return res.status(200).json({ jobs: nearbyJobs });
  } catch (error) {
    console.error("Failed to get nearby jobs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
