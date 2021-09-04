import jwt from "jsonwebtoken"
import jwtSecret from "../secret/jwtSecret.js"


const auth = {}

// 创建 token
auth.createToken = (uid, expire) => {
  return jwt.sign({ uid, expire }, jwtSecret)
}

export default auth
