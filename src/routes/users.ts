import express from 'express'
import controller from '../controllers/users'

const router = express.Router()

router.get('/users', controller.getAllUsers)
router.get('/users/:id', controller.getUserById)
router.post('/users', controller.addUser)

export = router
// Or export default router
