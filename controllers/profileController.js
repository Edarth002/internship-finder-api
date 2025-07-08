import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Register User Profile
export async function profile(req, res) {
  const { fullname, email, number, age, department, school, industry } =
    req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: email && fullname,
    });

    if (existingUser) {
      return null;
    }
  } catch (error) {}
}
