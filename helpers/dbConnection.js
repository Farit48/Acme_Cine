import {MongoClient} from 'mongodb'
import 'dotenv/config'

const client = new MongoClient(process.env.URL_MONGO)

export const dbBS = async()=>{
    try{
        await client.connect();
        console.log('Conectado a la base de datos')
        return client.db(process.env.DB_NAME)
    }catch (err){
        console.log(err)
        throw err
    }
}