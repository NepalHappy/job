import bcrypt from 'bcryptjs'

export const hashedPassword = async (password) => {
  const genSalt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, genSalt)
  return hashedPassword
}

export const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword)
  return isMatch
}
