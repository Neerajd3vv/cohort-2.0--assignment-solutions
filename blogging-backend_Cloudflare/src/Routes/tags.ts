import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { Context } from "hono";
import authmiddleware from "../middlewares";
const tagsRouter = new Hono();

tagsRouter.get("/all-tags", async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const tags = await prisma.tags.findMany({});
    return c.json({ Tags: tags });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
});

tagsRouter.get("tagsname/:tagName", async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const tagName = c.req.param("tagName");
    const particularTag = await prisma.posts.findMany({
      where: {
        tags: {
          some: {
            tags: tagName,
          },
        },
      },
    });
    return c.json({
      post: particularTag
    })
  } catch (error) {}
});

export default tagsRouter;
