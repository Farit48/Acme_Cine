import express from 'express'







import  CinemaController  from '../controllers/cinema.controller.js'

import { dbBS } from '../../helpers/dbConnection.js'

const dbBase = await dbBS()

const cinemaController = new CinemaController(dbBase.collection('Cinemas'))


const cinemaRoute = express.Router()

cinemaRoute.post('/register', cinemaController.create)
cinemaRoute.get('/read',cinemaController.getAll )
cinemaRoute.get('/readBy/:id',cinemaController.getBy )
cinemaRoute.put('/update/:id', cinemaController.update)
cinemaRoute.delete('/deleate/:id', cinemaController.delete)





export default cinemaRoute