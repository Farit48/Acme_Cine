import express  from 'express'




import  FilmControler  from '../controllers/film.controler.js'

import { dbBS } from '../../helpers/dbConnection.js'

const dbBase = await dbBS()

const filmController = new FilmControler(dbBase.collection('Films'))


const filmRoute = express.Router()

filmRoute.post('/register', filmController.create)
filmRoute.get('/read',filmController.getAll )
filmRoute.get('/readBy/:id',filmController.getBy )
filmRoute.put('/update/:id', filmController.update)
filmRoute.delete('/deleate/:id', filmController.delete)





export default filmRoute