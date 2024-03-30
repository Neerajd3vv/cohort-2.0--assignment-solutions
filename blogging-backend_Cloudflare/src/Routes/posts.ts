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
  tags: zod.string(),
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
      tags: string;
    } = await c.req.json();
    const tagNames = body.tags.split(",").map((tag) => tag.trim());
    const { success } = createPostSchema.safeParse(body);

    if (!success) {
      return c.body("Invalid user input", 400);
    }
    const newPost = await prisma.posts.create({
      data: {
        title: body.title,
        body: body.title,
        userId: c.get("userid"),
        tags: {
          connectOrCreate: tagNames.map((tags: any) => ({
            where: { tags },
            create: { tags },
          })),
        },
      },
      include: {
        tags: true,
      },
    });
    return c.json({
      message: "Post created successfully!",
      post: {
        id: newPost.id,
        title: newPost.title,
        body: newPost.body,
        tags: newPost.tags,
      },
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
});

//// All posts
postRouter.get("/all-posts", async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const response = await prisma.posts.findMany({
      include: {
        user: true,
        tags: true,
      },
    });
    return c.json({
      post: response.map((posts) => ({
        id: posts.id,
        username: posts.user.username,
        email: posts.user.email,
        userId: posts.user.id,
        title: posts.title,
        body: posts.body,
        tags: posts.tags,
      })),
    });
  } catch (error) {
    return c.body(`Internal server down:`, 500);
  }
});

////// All posts of user logged in
postRouter.get("/", authmiddleware, async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const findPosts = await prisma.posts.findMany({
      where: {
        userId: c.get("userid"),
      },
      include: {
        tags: true,
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
      include: {
        tags: true,
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
        tags: isPostExist.tags,
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

    const body: {
      title: string;
      body: string;
      tags: string;
    } = await c.req.json();
    const tagArray: any = body.tags.split(",").map((tag) => tag.trim());
    const postExists = await prisma.posts.findFirst({
      where: {
        id: id,
        userId: c.get("userid"),
      },
    });
    if (!postExists) {
      return c.body("Post does not exists", 404);
    } else {
      const updatePost = await prisma.posts.update({
        where: {
          id: id,
          userId: c.get("userid"),
        },
        data: {
          title: body.title,
          body: body.body,
          tags: tagArray.map((tag: any) => ({
            where: { tag },
            create: { tag },
          })),
        },
        include:{
          tags:true
        }
      });
      return c.json({
        updatedPost: {
          id: updatePost.id,
          title: updatePost.title,
          body: updatePost.body,
          tags: updatePost.tags
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
