import 'express-async-errors'
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'
import authRouter from './routes/authRouter.js'
import jobRouter from './routes/jobRouter.js'
import userRouter from './routes/userRouter.js'
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js'
import { authenticateUser } from './middleware/authMiddleware.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})
const __dirname = dirname(fileURLToPath(import.meta.url))
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'))
// }
app.use(express.static(path.resolve(__dirname, './client/dist')))
app.use(cookieParser())
app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobRouter)
app.use('/api/v1/user', authenticateUser, userRouter)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'))
})
//route doesnot exists
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not Found' })
})
//for error in controller
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 5000

try {
  await mongoose.connect(process.env.MONGO_URI)
  app.listen(port, () => {
    console.log(`Server is Running at ${port}`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
