import express from 'express'
import 'dotenv/config'

import userRoute from './src/routes/user.route.js'

const app = express()

app.use(express.json())

app.use(express.static('./public'))

app.use('/user', userRoute)


app.listen(
    {hostname:process.env.APP_HOSTNAME, port:process.env.APP_PORT},
    ()=>{
        console.log(`Server is running:${process.env.APP_HOSTNAME}:${process.env.APP_PORT}`)
    }
)