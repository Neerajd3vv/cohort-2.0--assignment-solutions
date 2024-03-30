import { Hono } from 'hono'
import { cors } from 'hono/cors'
import userRoute from './Routes/users'
import postRouter from './Routes/posts'
import tagsRouter from './Routes/tags'

const app = new Hono()
app.use(cors())
app.route("/api/v1/users", userRoute)
app.route("/api/v1/posts" , postRouter)
app.route("/api/v1/tags" , tagsRouter)
export default app
