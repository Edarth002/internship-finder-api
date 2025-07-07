import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

//Register Controller
export async function register(req, res) {
  //Destructure req body content into parameters; email and password
  const { email, password } = req.body;

  try {
    //Check if user exists before registering that user by checking if email exists(assuming email is a unique parameter)

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //If code reaches here, it is assumed user does not exist, so a new user is created but the password must be encrypted
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: encryptedPassword },
    });

    //A token is generated that is used to grant access to the user, this token is set to expire in 2days
    const uniqueToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    //If the registeration is successful, user data and jwt is sent back as json
    res.status(201).json({ user, uniqueToken });
  } catch (error) {
    //If it fails, error is sent to console and back to user, which is masked by the frontend
    console.log("Registeration error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//Login Controller
export async function login(req, res) {
  const { email, password } = req.body;

  //find user
  try {
    const alreadyExistingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!alreadyExistingUser) {
      res.status(400).json({
        message:
          "User does not exist, register to access our awesome application",
      });
    }

    //If user exists, then compare password to ensure it matches before generating a token for that user
    const passwordMatch = bcrypt.compare(
      password,
      alreadyExistingUser.password
    );

    if (!passwordMatch) {
      res.status(400).json({ message: "Incorrect Password" });
    }

    //Since user exists and passwords match, a new token is generated that is used to grant access to the user, this token is set to expire in 2days
    const token = jwt.sign(
      { userId: alreadyExistingUser.id },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.status(201).json({ alreadyExistingUser, token });
  } catch (error) {
    console.log("Login Error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
