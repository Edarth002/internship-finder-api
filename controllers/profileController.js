import nigeriaStateCoordinates from "../utils/coordinates.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function profileUpdate(req, res) {
  const userId = req.user.userId;
  const { fullname, number, age, department, school, industry, state } =
    req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Already has profile
    if (
      existingUser.fullname &&
      existingUser.number &&
      existingUser.age &&
      existingUser.department &&
      existingUser.industry &&
      existingUser.school &&
      existingUser.longitude &&
      existingUser.latitude
    ) {
      return res.status(200).json({
        message: "Profile already exists",
        profile: existingUser,
      });
    }

    const coords = nigeriaStateCoordinates[state];
    if (!coords) {
      return res.status(400).json({ message: "Invalid state provided" });
    }

    const newProfile = await prisma.user.update({
      where: { id: userId },
      data: {
        fullname,
        number,
        age,
        department,
        school,
        industry,
        state,
        longitude: coords.lon,
        latitude: coords.lat,
      },
    });

    res.status(201).json({ message: "Profile updated", profile: newProfile });
  } catch (error) {
    console.log("Profile update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
