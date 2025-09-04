import express from 'express'

export function csvRoute(db){
    const route = express.Router()
    route.post('/putCsv', (req,res)=>{
        const registros = req.body.split('\n').map(elem=> elem.replace('\r',''));
        const dataHeader = registros[0].split(';');
        console.log(registros,dataHeader)

        const cines = {
            cine_codigo:cineCodigo,
            cine_nombre:cineNombre,
            cine_direccion:cineDireccion,
            cine_ciudad:cineCiudad,
            cine_salas:{
                sala_codigo:salaCodigo,
                sala_sillas:salaSillas,
            }
        }
        const salas =

        registros.forEach((element, i)=>{
            let obj = {}
            if(i>0){
                const registro = element.split(';')
                registro.forEach(async(value, j)=>{
                    switch(dataHeader[j].split('_')[1]){
                        case 'cine':
                            obj.cine = {...obj.cine,[cines[dataHeader[j]]]:value}
                            
                    }
                })

            }
        })

        res.send('Testing')

    })
}



