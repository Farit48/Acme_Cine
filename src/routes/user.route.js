import express, { json } from 'express'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

import { createUserValidator,updateUserValidator,loginValidator } from '../../helpers/middlerwares/user.validator.js'
import { validationResult } from 'express-validator'
import verifyToken from '../../helpers/middlerwares/auth.middlerware.js'


import { ObjectId } from 'mongodb'


import { dbBS } from '../../helpers/dbConnection.js'


const userRoute = express.Router()

userRoute.post('/register', verifyToken ,createUserValidator, async(req, res)=>{
    try{
        const db = await dbBS()
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            console.log('Error de validacion')
            return res.json({message:'Error de validacion', errors})
        }
        const user = req.body
        const passwordHash = bcrypt.hashSync(user.password,10)
        const creation = await db.collection('Users').insertOne({...user,password:passwordHash})
        
        return res.status(201).json({message:'Usuarion creado con exito', creation})
    }catch(err){
        res.status(401).json({message:'Error al crear usuario', error: err})
    }
})

userRoute.get('/read',  async(req, res)=>{
    try{
        const db = await dbBS()
        const result = await db.collection('Users').find({}).toArray()
        return res.status(200).send(result)
    }catch(err){
        res.status(401).json({message:'Error al crear usuario', error: err})
    }
})

userRoute.put('/update/:id', updateUserValidator, async(req,res)=>{
    try{
        const db = await dbBS()
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            console.log('Error de validacion')
            return res.json({message:'Error de validacion', errors})
        }
        const result = db.collection('Users').updateOne({_id:ObjectId.createFromHexString(req.params.id)}, {$set:req.body})
        return res.status(200).json({message:'Actualizado con exito', result})
    }catch(err){
        res.status(401).json({message:'Error al crear usuario', error: err})
    }
})

userRoute.delete('/deleate/:id',async(req,res)=>{
    try{
        const db = await dbBS()
        const result = await db.collection('Users').deleteOne({_id:ObjectId.createFromHexString(req.params.id)})
        return res.status(201).json({message:'Se pudo eliminar correctamente', result})
    }catch(err){
        res.status(401).json({message:'Error al crear usuario', error: err})
    }
})



userRoute.post('/login', loginValidator, async(req,res)=>{
    try{
        const {user, password} = req.body
        const db = await dbBS()
        if(!user || !password){
            return res.status(401).json({message:'Ingrese datos'})
        }
        const result1 = await db.collection('Users').findOne({email:user})
        if(result1){
            if(bcrypt.compareSync(password,result1.password)){
                const token = jwt.sign({sub:result1._id, name:result1.name, email:result1.email}, process.env.CLAVE_SEGURA, {expiresIn:'1h'})
                return res.json({token})
            }
        }
        return res.json({message:'No se haya usuario'})
        
    }catch(err){
        res.status(500).json({message:'Error del servidor', error:err})
    }
})

export default userRoute