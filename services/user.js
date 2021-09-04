import User from "../models/user.js"
import { isDef } from "../utils/index.js"

const user = {}

user.exist = async (username, password) => {
  let r = await User.findOne({where: { username, password }, attributes: ['id']})
  if (r === null) return null
  return r.get('id')
}

user.existUsername = async (username) => {
  let r = await User.findOne({where: { username }, attributes: ['id']})
  return isDef(r)
}

user.register = async (username, password) => {
  const r = await User.create({ username, password })
  return r.get('id')
}

export default user
