import express from 'express'
import UserRouter from './routes/user'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const port = 3000

app.use("/user" , UserRouter)

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
    
})