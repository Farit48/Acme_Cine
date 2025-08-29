import { ObjectId } from "mongodb";

import {validationResult} from 'express-validator'
import Userlog from "../../helpers/dtos/userlog.dto.js";


import bcrypt from 'bcryptjs'

import Cinemamodel from "../models/cinemas.model.js";


export default class CinemaController {
    #CinemaModel
    constructor(db){
        this.#CinemaModel = new Cinemamodel(db)
        this.getAll=this.getAll.bind(this)
        this.getBy=this.getBy.bind(this)
        this.create=this.create.bind(this)
        this.update=this.update.bind(this)
        this.delete= this.delete.bind(this)
    } 
    async getAll(req, res){
        try{
            const result = await this.#CinemaModel.findAll()
            return res.status(200).send(result)
        }catch(err){
            res.status(401).json({message:'Error al crear usuario', error: err})
        }
    }
        
    
    async getBy(req,res){
        try{
            const data = await this.#CinemaModel.findBy({_id:ObjectId.createFromHexString(req.params.id)});
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
            const creation = await this.#CinemaModel.create({...user,password:passwordHash})
            
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
            const result = await this.#CinemaModel.update({_id:ObjectId.createFromHexString(req.params.id)}, {$set:req.body})
            return res.status(200).json({message:'Actualizado con exito', result})
        }catch(err){
            res.status(401).json({message:'Error al crear usuario', error: err})
        }
    }
        
    async delete (req,res){
        try{
            const result = await this.#CinemaModel.delete({_id:ObjectId.createFromHexString(req.params.id)})
            return res.status(201).json({message:'Se pudo eliminar correctamente', result})
        }catch(err){
            res.status(401).json({message:'Error al crear usuario', error: err})
        }
    }

}