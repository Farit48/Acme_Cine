import express from 'express'


import 'dotenv/config'

import { createUserValidator,updateUserValidator,loginValidator } from '../../helpers/middlerwares/user.validator.js'




import  UserController  from '../controllers/user.controller.js'

import { dbBS } from '../../helpers/dbConnection.js'

const dbBase = await dbBS()

const userController = new UserController(dbBase.collection('Users'))


const userRoute = express.Router()

userRoute.post('/register', createUserValidator, userController.create)
userRoute.get('/read',userController.getAll )
userRoute.get('/read:_id',userController.getBy )
userRoute.put('/update/:id', updateUserValidator, userController.update)
userRoute.delete('/deleate/:id', userController.delete)



userRoute.post('/login', loginValidator )

export default userRoute