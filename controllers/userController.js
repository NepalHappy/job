import { StatusCodes } from 'http-status-codes'
import User from '../models/UserModel.js'
import cloudinary from 'cloudinary'
import { formatImage } from '../middleware/multerMiddleware.js'

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  const userWithoutPassword = user.toJSON()
  res.status(StatusCodes.OK).json({ user: userWithoutPassword })
}

export const updateUser = async (req, res) => {
  //console.log(req.file)
  const id = req.user.userId
  const newUser = { ...req.body }

  if (req.file) {
    const file = formatImage(req.file)
    const response = await cloudinary.v2.uploader.upload(file)
    // await fs.unlink(req.file.path)
    newUser.avatar = response.secure_url
    newUser.avatarPublicId = response.public_id
  }
  const updatedUser = await User.findByIdAndUpdate(id, newUser)

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
  }
  res.status(StatusCodes.OK).json({ msg: updatedUser })
}
