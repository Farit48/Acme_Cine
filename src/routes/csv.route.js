import express from 'express'

const csvRoute = express.Router()

csvRoute.post('/putCsv', (req,res)=>{
    const registros = req.body.split('\n').map(elem=> elem.replace('\r',''));
    const dataHeader = registros[0].split(';');
    console.log(registros,dataHeader)

    registros.forEach((element, i)=>{
        let obj = {}
        if(i>0){
            const registro = element.split(';')
            console.log(registro)
        }
    })

    res.send('Testing')

})

export default csvRoute