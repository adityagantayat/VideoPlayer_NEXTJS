import { TypeOf, object, string } from 'zod'

export const registerUserSchema = {
  body: object({
    username: string({
      required_error: 'username is required',
    }),
    email: string({
      required_error: 'email is required',
    }).email('Not a valid email'),
    password: string({
      required_error: 'password is required',
    }).min(6, 'Password must be a least 6 characters long'),
    confirmPassword: string({
      required_error: 'confirmPassword is required',
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }),
}

export type ResgisterUserBody = TypeOf<typeof registerUserSchema.body>
