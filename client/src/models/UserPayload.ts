import User from '@/models/User'

export type UserKey = keyof User
export type UserValue = User[UserKey]
export default interface UserPayload<Key extends keyof User,
  Value extends User[Key]> {
  key: Key,
  value: Value
}
