import { User, UserModel } from './user.model'
import { ResgisterUserBody } from './user.schema'

export async function createUser(user: Omit<User, 'comparePassword'>) {
  return UserModel.create(user)
}
export async function findUserByEmail(email: User['email']) {
  return UserModel.findOne({ email })
}
