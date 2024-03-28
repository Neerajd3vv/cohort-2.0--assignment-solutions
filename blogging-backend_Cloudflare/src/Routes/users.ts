import { Hono } from "hono";
import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import zod from "zod";
import { Jwt } from "hono/utils/jwt";

const userRoute = new Hono();

// signup zod
const signupSchema = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

// signin zod
const signinSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

enum statusCodes {
  BARREQ = 400,
  NOTFOUND = 404,
  NOTPERMISSION = 403,
}

//// SIGNUP /////
userRoute.post(
  "/signup",
  async (
    c: Context /* here Context is a type to c , it also comes properties such as c.env, c.re, c.req w*/
  ) => {
    // creatd a prismaClient instance
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
      // JSON parsing is aschronous task so we are awaiting it
      const body: {
        username: string;
        email: string;
        password: string;
      } = await c.req.json();

      const { success } = signupSchema.safeParse(body);
      if (!success) {
        return c.body("zod validation failed", statusCodes.BARREQ);
      } else {
        const userExits = await prisma.user.findFirst({
          where: {
            email: body.email,
          },
        });
        if (!userExits) {
          const newUser = await prisma.user.create({
            data: {
              username: body.username,
              email: body.username,
              password: body.password,
            },
          });
          const userEmail = newUser.email;
          const token = await Jwt.sign(userEmail, c.env.JWT_SECRET);
          return c.json({
            msg: "User created succesfully",
            token: token,
            user: {
              id: newUser.id,
              username: newUser.username,
              email: newUser.username,
            },
          });
        } else {
          return c.body("User with those inputs already!");
        }
      }
    } catch (error) {
      return c.body(`Internal server error: ${error}`, 500);
    }
  }
);


//// SIGNIN /////
userRoute.post("/signin", async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body: {
      email: string;
      password: string;
    } = await c.req.json();

    const { success } = signinSchema.safeParse(body);
    if (!success) {
      return c.json({ msg: "zod validation failed!" });
    } else {
      const userExist = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      });
      if (!userExist) {
        return c.json({ msg: "User does'nt exist with those credentials" });
      } else {
        const user_email = userExist.email;
        const token = await Jwt.sign(user_email, c.env.JWT_SECRET);
        return c.json({
          msg: "Login successfully!",
          token: token,
          user: {
            id: userExist.id,
            username: userExist.username,
            email: userExist.email,
          },
        });
      }
    }
  } catch (error) {
    return c.json(`Internal server error: ${error}`, 500);
  }
});



export default userRoute;
