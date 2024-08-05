import mongoose from 'mongoose'
import User from '../models/UserModel.js'
import { StatusCodes } from 'http-status-codes'
import { hashedPassword, comparePassword } from '../utils/passwordUtils.js'
import { UnauthenticatedError } from '../errors/customErrors.js'
import { createJWT } from '../utils/tokenUtils.js'

export const registerUser = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0
  const isAdmin = isFirstAccount ? 'admin' : 'user'
  req.body.role = isAdmin
  const { password } = req.body
  const hashPassword = await hashedPassword(password)
  req.body.password = hashPassword
  const user = await User.create(req.body)
  res.status(StatusCodes.OK).json({ msg: user })
}

export const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) throw new UnauthenticatedError('Invalid Credentials')
  const isPasswordCorrect = await comparePassword(
    req.body.password,
    user.password
  )
  if (!isPasswordCorrect) throw new UnauthenticatedError('Invalid Credentials')
  const token = createJWT({ userId: user._id, role: user.role })
  const oneDay = 1000 * 60 * 60 * 24
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
  })
  res.status(StatusCodes.OK).json({ msg: 'User Logged in' })
}

export const logoutUser = async ({ req, res }) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({ msg: 'User Logout' })
}
