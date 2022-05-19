import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'
import { createUser } from './user.service'
import { ResgisterUserBody } from './user.schema'

export async function registerUserHandler(
  req: Request<{}, {}, ResgisterUserBody>,
  res: Response
) {
  const { username, email, password } = req.body
  try {
    await createUser({ username, email, password })
    res.status(StatusCodes.CREATED).send('User created successfully')
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send('User already exists')
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message)
  }
}
