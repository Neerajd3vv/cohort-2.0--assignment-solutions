import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import zod from "zod";

const prisma = new PrismaClient();
const router = Router();

// Signup zod schema
const signupSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
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

// Put todos route
router.put("/insert", async (req, res) => {
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

export default router;
