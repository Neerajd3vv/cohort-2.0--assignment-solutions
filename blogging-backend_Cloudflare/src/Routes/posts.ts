import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Jwt } from "jsonwebtoken";
import { Context } from "hono";
import zod from 'zod'

const postRouter = new Hono()

// zod posts cretion schema
const postSchema = zod.object({
    title : zod.string()
    
})

postRouter.post("/InsertPosts" , (c: Context)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    })
    try {
        return c.json({msg: "incomplete"})
    } catch (error) {
        
    }
})

export default postRouter