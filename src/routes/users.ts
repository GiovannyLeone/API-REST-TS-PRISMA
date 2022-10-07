import express from 'express'
import controller from '../controllers/users'

const router = express.Router()

router.get('/users', controller.getAllUsers)
router.get('/users/:id', controller.getUserById)
router.post('/users', controller.addUser)
router.put('/users/:id', controller.updateUser)
router.get('/cep', controller.getCep)


export default router
// Or export default router
