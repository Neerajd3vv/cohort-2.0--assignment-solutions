import { Hono } from 'hono'
import { cors } from 'hono/cors'
import userRoute from './Routes/users'
import postRouter from './Routes/posts'

const app = new Hono()
app.use(cors())
app.route("/api/v1/users", userRoute)
app.route("/api/v1/posts" , postRouter)
export default app
