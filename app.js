import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import router from './router/index.js'
import responseHandler from './middlewares/response.js'

import './models/index.js'

const app = new Koa()

app.use(logger())
app.use(bodyParser())
app.use(router.routes(), router.allowedMethods())
app.use(responseHandler)

export default app