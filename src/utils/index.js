import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const SECRET = 'edteam'

export const getUserId = request => {
  const header = request.get('authorization')

  if (header) {
    const token = header.replace('Bearer ', '')
    const { userId } = jwt.verify(token, SECRET)
    return userId
  }
  throw new Error('Authorization required')
}

export const hashPassword = async password => {
  if (password.length < 6)
    throw new Error('Password must be 6 characters or longer')

  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export const validatePassword = async (reqPassword, dbPassword) => {
  try {
    return await bcrypt.compare(reqPassword, dbPassword)
  } catch (error) {
    throw new Error('Password fail')
  }
}

export const generateToken = userId => {
  return jwt.sign({ userId }, SECRET, { expiresIn: '2 days' })
}
