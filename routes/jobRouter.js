import { Router } from 'express'
import {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js'
import {
  validateJobInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js'

const router = Router()

router.post('/createJob', validateJobInput, createJob)
router.get('/getAllJobs', getAllJobs)
router.get('/getJob/:id', validateIdParam, getJob)
router.patch('/updateJob/:id', validateJobInput, validateIdParam, updateJob)
router.delete('/deleteJob/:id', validateIdParam, deleteJob)
export default router
