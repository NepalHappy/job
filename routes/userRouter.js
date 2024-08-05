import { Router } from 'express'
const router = Router()
import { getCurrentUser, updateUser } from '../controllers/userController.js'
import upload from '../middleware/multerMiddleware.js/'
import { validateUserInput } from '../middleware/validationMiddleware.js'

router.get('/getCurrentUser', getCurrentUser)
router.patch(
  '/updateUser',
  upload.single('avatar'),
  validateUserInput,
  updateUser
)

export default router
