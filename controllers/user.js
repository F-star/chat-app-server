import { Day } from '../utils/time.js'
import auth from '../utils/auth.js'
import { SESSION_ID } from '../common/constants/index.js'
import userSerives from '../services/user.js'
import Joi from 'joi'
import { isDev, isUndef } from '../utils/index.js'
import ErrCode from '../errCode/index.js'

const t = Day * 60 // jwt 有效时长

const setCookieSID = (ctx, token) => {
  ctx.cookies.set(SESSION_ID, token, {
    httpOnly: true,
    maxAge: t
  })
}

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
})

const user = {}
// 登录。返回 jwt
user.login = async (ctx, next) => {
  // 校验参数格式
  const { value, error } = userSchema.validate(ctx.request.body)
  if (error) {
    ctx.status = 400
    ctx.body = {
      code: ErrCode.ArgsFormatWrong.code,
      msg: isDev ? error.message : ErrCode.ArgsFormatWrong.msg,
    }
    next()
    return
  }

  const { username, password } = value
  // 1. 检测用户名和密码是否存在
  const uid = await userSerives.exist(username, password)
  if (isUndef(uid)) {
    ctx.status = 401
    ctx.body = {
      code: ErrCode.Unauth.code,
      msg: ErrCode.Unauth.msg
    }
    return
  }

  // 数据库中找到 uid
  const expire = new Date().getTime() + t
  const token = auth.createToken(uid, expire)
  setCookieSID(ctx, token)
  ctx.result = 'success'
  next()
}

// 注册。返回 jwt
user.register = async (ctx, next) => {
  // 校验参数格式
  const { value, error } = userSchema.validate(ctx.request.body)
  if (error) {
    ctx.status = 400
    ctx.body = {
      code: ErrCode.ArgsFormatWrong.code,
      msg: isDev ? error.message : ErrCode.ArgsFormatWrong.msg,
    }
    next()
    return
  }

  const { username, password } = value

  // 用户名不能重复
  const hasSameUserName = await userSerives.existUsername(username)
  if (hasSameUserName) {
    ctx.body = {
      code: ErrCode.SameUserName.code,
      msg: ErrCode.SameUserName.msg,
    }
    return
  }

  const uid = await userSerives.register(username, password)
  const expire = new Date().getTime() + t
  const token = auth.createToken(uid, expire)
  setCookieSID(ctx, token)

  ctx.body = {
    code: 200,
    msg: 'success'
  }

  next()
}

export default user
