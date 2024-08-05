import {
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/authController.js'
import { Router } from 'express'
import {
  validateRegisterInput,
  validateLoginInput,
} from '../middleware/validationMiddleware.js'
const router = Router()

router.post('/registerUser', validateRegisterInput, registerUser)
router.post('/loginUser', validateLoginInput, loginUser)
router.get('/logoutUser', logoutUser)
export default router
