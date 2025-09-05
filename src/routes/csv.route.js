import express from 'express'

import {MongoClient} from 'mongodb'



const client = new MongoClient(process.env.URL_MONGO)
await client.connect()
const db = client.db(process.env.DB_NAME)

export function csvRoute(){
    const route = express.Router()
    route.post('/putCsv', (req,res)=>{
        const registros = req.body.split('\n').map(elem=> elem.replace('\r',''));
        const dataHeader = registros[0].split(';');
        console.log(registros,dataHeader)

        const cine = {
            cine_codigo:cineCodigo,
            cine_nombre:cineNombre,
            cine_direccion:cineDireccion,
            cine_ciudad:cineCiudad,
            cine_salas:{
                sala_codigo:salaCodigo,
                sala_sillas:salaSillas,
            }
        }
    

        registros.forEach((element, i)=>{
            console.log(element)
            let obj = {}
            if(i>0){
                const registro = element.split(';')
                registro.forEach(async(value, j)=>{
                    switch(dataHeader[j].split('_')[1]){
                        case 'cine':
                            obj.cine = {...obj.cine,[cine[dataHeader[j]]]:value}
                            const result = await db.collection('Cinemas').insertOne([obj.cines])
                            console.log(result)

                            
                    }
                })

            }
        })

        res.send('Testing')

    })
    return route;
}



