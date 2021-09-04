import Router from '@koa/router'
import user from '../controllers/user.js'

const router = new Router()

router.prefix('/api/v1')
router.post('/login', user.login)
router.post('/register', user.register)

export default router
