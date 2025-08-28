import { ObjectId } from "mongodb";

import {validationResult} from 'express-validator'
import Userlog from "../../helpers/dtos/userlog.dto.js";


import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import UserModel from "../models/user.models.js";


export default class UserController {
    #userModel
    constructor(db){
        this.#userModel = new UserModel(db)
        this.login = this.login.bind(this)
        this.getAll=this.getAll.bind(this)
        this.getBy=this.getBy.bind(this)
        this.create=this.create.bind(this)
        this.update=this.update.bind(this)
        this.delete= this.delete.bind(this)
    }
    async login (req,res){
        try{
            const {user, password} = req.body
            if(!user || !password){
                return res.status(401).json({message:'Ingrese datos'})
            }
            const result1 = await this.#userModel.findBy({email:user})
            if(result1){
                if(bcrypt.compareSync(password,result1.password)){
                    const token = jwt.sign({sub:result1._id, name:result1.name, email:result1.email}, process.env.CLAVE_SEGURA, {expiresIn:'1h'})
                    const userData = new Userlog(result1)
                    console.log(userData)
                    return res.json({token,userData})
                }
            }
            return res.json({message:'No se haya usuario'})

        }catch(err){
            res.status(500).json({message:'Error del servidor', error:err})
        }
    }   
    async getAll(req, res){
        try{
            const result = await this.#userModel.findAll()
            return res.status(200).send(result)
        }catch(err){
            res.status(401).json({message:'Error al crear usuario', error: err})
        }
    }
        
    
    async getBy(req,res){
        try{
            const data = await this.#userModel.findBy({_id:ObjectId.createFromHexString(req.params.id)});
            if(data){
               return res.json(data)
            }else{
                return res.status(404).json({message: 'Info no encontrada'})
            }
        }catch(err){
            console.error('Error',err)
            return res.json(err)
        }
        
        
    }
    async create(req, res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                console.log('Error de validacion')
                return res.json({message:'Error de validacion', errors})
            }
            const user = req.body
            const passwordHash = bcrypt.hashSync(user.password,10)
            const creation = await this.#userModel.create({...user,password:passwordHash})
            
            return res.status(201).json({message:'Usuarion creado con exito', creation})
        }catch(err){
            res.status(401).json({message:'Error al crear usuario', error: err})
        }
    }
    async update(req,res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                console.log('Error de validacion')
                return res.json({message:'aaaaaa  Error de validacion', errors})
            }
            const result = await this.#userModel.update({_id:ObjectId.createFromHexString(req.params.id)}, {$set:req.body})
            return res.status(200).json({message:'Actualizado con exito', result})
        }catch(err){
            res.status(401).json({message:'Error al crear usuario', error: err})
        }
    }
        
    async delete (req,res){
        try{
            const result = await this.#userModel.delete({_id:ObjectId.createFromHexString(req.params.id)})
            return res.status(201).json({message:'Se pudo eliminar correctamente', result})
        }catch(err){
            res.status(401).json({message:'Error al crear usuario', error: err})
        }
    }

}