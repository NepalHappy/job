import * as dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import Job from './models/JobModel.js'
import User from './models/UserModel.js'
import { readFile } from 'fs/promises'
dotenv.config()
const app = express()
const port = process.env.port || 5000

try {
  await mongoose.connect(process.env.MONGO_URI)
  const user = await User.findOne({ email: 'hari@gmail.com' })
  const jsonJobs = JSON.parse(
    await readFile(new URL('./utils/mockData.json', import.meta.url))
  )
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id }
  })

  await Job.create(jobs)
  console.log('Success')
  process.exit(0)
} catch (error) {
  console.log(error)
  process.exit(1)
}
