import { Hono, Next } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
// import { Jwt } from "jsonwebtoken";
import { Context } from "hono";
import zod from "zod";
import authmiddleware from "../middlewares";

const postRouter = new Hono();

// zod posts creation/update schema
const createPostSchema = zod.object({
  title: zod.string(),
  body: zod.string(),
});

//////  post create route
postRouter.post("/createpost", authmiddleware, async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body: {
      title: string;
      body: string;
    } = await c.req.json();

    const { success } = createPostSchema.safeParse(body);
    if (!success) {
      return c.json({ msg: "Validation failed" });
    } else {
      const userId = c.get("userid");

      // Create the post, relying on Prisma to handle the relationship
      const newPost = await prisma.posts.create({
        data: {
          title: body.title,
          body: body.body,
          user: {
            connect: { id: userId }, // Connect to the existing user
          },
        },
      });

      return c.json({
        post: {
          title: newPost.title,
          body: newPost.body,
        },
      });
    }
  } catch (error) {
    return c.json(`Internal server error: ${error}`, 500);
  }
});

////// All posts if user logged in
postRouter.get("allposts", authmiddleware, async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const findPosts = await prisma.posts.findMany({
      where: {
        userId: c.get("userid"),
      },
    });
    return c.json({ Posts: findPosts });
  } catch (error) {
    return c.json(`Internal server error: ${error}`, 500);
  }
});

//// find on bases of id
postRouter.get("/post/:id", authmiddleware, async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id: number = Number(c.req.param("id"));

    const isPostExist = await prisma.posts.findFirst({
      where: {
        id: id,
        userId: c.get("userId"),
      },
    });

    if (isPostExist == null) {
      return c.body("Post does not exists", 404);
    }
    return c.json({
      data: {
        id: isPostExist.id,
        title: isPostExist.title,
        body: isPostExist.body,
      },
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
});

////// update post of particular id
postRouter.put("/post/:id", authmiddleware, async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id: number = Number(c.req.param("id"));
    const userid = c.get("userid");
    console.log(userid);

    const body: {
      title: string;
      body: string;
    } = await c.req.json();
    const postExists = await prisma.posts.findFirst({
      where: {
        id: id,
        userId: userid,
      },
    });
    if (!postExists) {
      return c.body("Post does not exists", 404);
    } else {
      const updatePost = await prisma.posts.update({
        where: {
          id: id,
          userId: userid,
        },
        data: {
          title: body.title,
          body: body.body,
        },
      });
      return c.json({
        updatedPost: {
          id: updatePost.id,
          title: updatePost.title,
          body: updatePost.body,
        },
      });
    }
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
});

////// Delete post of particular id
postRouter.delete("/post/:id", authmiddleware, async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id: number = Number(c.req.param("id"));
  const userid = c.get("userid");
  const postExists = await prisma.posts.findFirst({
    where: {
      id: id,
      userId: userid,
    },
  });
  if (!postExists) {
    return c.body("Post does not exists", 404);
  }
  await prisma.posts.delete({
    where: {
      id: id,
      userId: userid,
    },
  });
  return c.text("Deleted successfully!");
});

export default postRouter;
