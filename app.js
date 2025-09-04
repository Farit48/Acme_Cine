import express from 'express'
import 'dotenv/config'

import userRoute from './src/routes/user.route.js'
import authRoute from './src/routes/login.route.js'
import cinemaRoute from './src/routes/cinema.route.js'
import filmRoute from './src/routes/film.route.js'
 
import {MongoClient} from 'mongodb'

import csvRoute from './src/routes/csv.route.js'


import verifyToken from './helpers/middlerwares/auth.middlerware.js'

const app = express()

app.use(express.json())
app.use(express.text())

app.use(express.static('./public'))

const client = new MongoClient(process.env.URL_MONGO)
await client.connect()
const db = client.db(process.env.DB_NAME)

app.use('/log' ,authRoute)
app.use('/user', verifyToken,userRoute)
app.use('/cinema',verifyToken,cinemaRoute )
app.use('/function',filmRoute )
app.use('/csv', csvRoute(db))


app.listen(
    {hostname:process.env.APP_HOSTNAME, port:process.env.APP_PORT},
    ()=>{
        console.log(`Server is running:${process.env.APP_HOSTNAME}:${process.env.APP_PORT}`)
    }
)