import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Register User Profile
export async function profileUpdate(req, res) {
  const userId = req.user.userId;
  const { fullname, number, age, department, school, industry } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    //This ensures that an unexisting user does not bypass and have access to creating profile
    if (!existingUser) {
      return res.status(200).json({ message: "User does not exist" });
    }

    //This returns the profile if found
    if (
      existingUser.fullname &&
      existingUser.number &&
      existingUser.age &&
      existingUser.department &&
      existingUser.industry &&
      existingUser.school
    ) {
      return res
        .status(201)
        .json({ message: "Profile already exists", profile: existingUser });
    }

    //If user exists but profile is not found, this section creates a new profile for the user
    // (note that update is used instead of create, this is because the user record is already initialized but missing parameters which are filled in
    //  by the profile post method submitted as a form to frontend)
    const newProfile = await prisma.user.update({
      where: { id: userId },
      data: {
        fullname,
        number,
        age,
        department,
        school,
        industry,
      },
    });

    //Return profile to the frontend after it has been created
    res.status(201).json({ message: "Profile Updated", profile: newProfile });
  } catch (error) {
    console.log("Profile could not be fetched because: ", error);
    res.status(501).json({ message: "Internal server error" });
  }
}
