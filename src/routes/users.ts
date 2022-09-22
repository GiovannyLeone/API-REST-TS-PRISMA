import express from 'express'
import controller from '../controllers/users'

const router = express.Router()

router.get('/users', controller.getAllUsers)
router.post('/users', controller.addUser)

export = router
// Or export default router
