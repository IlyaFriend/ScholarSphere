import { createError, eventHandler, readBody } from 'h3'
import { sign } from 'jsonwebtoken'
import { User } from '~/server/dbModels'

interface IRequestBody {
  username: string;
  password: string;
}

export const SECRET = 'dummy'

export default eventHandler(async (event) => {
  const { username, password } = await readBody<IRequestBody>(event)
  const userData = await User.findOne({ username })
  if (!userData) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found.'
    })
  }
  console.log('userData', userData)
  const isPasswordValid = await userData.verifyPasswordSync(password)
  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Wrong password.'
    })
  }

  const userEntities = await findAdminEntities(userData._id)

  const user = {
    id: userData._id,
    username: userData.username,
    firstName: userData.firstName,
    lastName: userData.lastName,
    role: userData.role,
    scopus_id: userData.scopus_id,
    ...userEntities
    // fullName: userData.fullName
  }

  const accessToken = sign({ ...user }, SECRET, {
    expiresIn: 15 * 1000
  })
  const refreshToken = sign({ ...user }, SECRET, {
    expiresIn: 60 * 60 * 24
  })

  return {
    token: {
      accessToken,
      refreshToken
    }
  }
})
