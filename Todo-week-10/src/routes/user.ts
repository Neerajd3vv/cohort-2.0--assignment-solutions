import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import zod from "zod";
import jwt from "jsonwebtoken";
import jwt_key from "../config";
import authMiddleware from "../authmiddleware";

const prisma = new PrismaClient();
const router = Router();

// Signup zod schema
const signupSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

// signin Schema
const signinSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

// insert Todos schema
const insertSchema = zod.object({
  userId: zod.number(),
  title: zod.string(),
  description: zod.string(),
});

// Signup Route
router.post("/signup", async (req, res) => {
  const success = signupSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({ msg: "fails zod validation" });
  } else {
    const userExists = await prisma.users.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (!userExists) {
      await prisma.users.create({
        data: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
        },
      });
      res.json({ msg: "User created successfully" });
    } else {
      res.status(411).json({ msg: "Inputs not correct" });
    }
  }
});

// signin route
router.post("/signin", async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({ msg: "fails zod validation" });
  } else {
    const userExists = await prisma.users.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (!userExists) {
      res
        .status(401)
        .json({ msg: "You are not signed up pls, make account first" });
    } else {
      const token = jwt.sign({ email: req.body.email }, jwt_key.JWT_TOKEN);
      res.status(200).json({ token: token });
    }
  }
});

// Put todos route
router.put("/insert", authMiddleware, async (req, res) => {
  const { success } = insertSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({ msg: "fails zod validation" });
  } else {
    await prisma.todos.create({
      data: {
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
      },
    });
    res.json({ msg: "Todos created successfully!" });
  }
});

router.post("/fetch", authMiddleware, async (req, res) => {
  const todos = await prisma.todos.findMany({
    where: {
      userId: req.body.userId,
    },
  });
  res.json({ msg: todos });
});

export default router;
