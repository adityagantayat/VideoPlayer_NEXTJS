import { TypeOf, object, string } from 'zod'

export const loginSchema = {
  body: object({
    email: string({
      required_error: 'email is required',
    }).email('Not a valid email'),
    password: string({
      required_error: 'password is required',
    }).min(6, 'Password must be a least 6 characters long'),
  }),
}

export type LoginBody = TypeOf<typeof loginSchema.body>
