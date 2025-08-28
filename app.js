import express from 'express'
import 'dotenv/config'

import userRoute from './src/routes/user.route.js'
import authRoute from './src/routes/login.route.js'
import verifyToken from './helpers/middlerwares/auth.middlerware.js'

const app = express()

app.use(express.json())

app.use(express.static('./public'))

app.use('/log' ,authRoute)
app.use('/user', verifyToken,userRoute)


app.listen(
    {hostname:process.env.APP_HOSTNAME, port:process.env.APP_PORT},
    ()=>{
        console.log(`Server is running:${process.env.APP_HOSTNAME}:${process.env.APP_PORT}`)
    }
)