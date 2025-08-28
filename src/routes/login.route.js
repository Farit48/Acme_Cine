import express from 'express'

import UserController from '../controllers/user.controller.js'



import {loginValidator} from '../../helpers/middlerwares/user.validator.js'
import { dbBS } from '../../helpers/dbConnection.js'

const dbBase = await dbBS()

const authRoute = express.Router()
const userController = new UserController(dbBase.collection('Users'))

authRoute.post('/login', loginValidator, userController.login)

export default authRoute