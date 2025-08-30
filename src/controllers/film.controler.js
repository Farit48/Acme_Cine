import { ObjectId } from "mongodb";

import FilmModel from "../models/films.model.js";


export default class FilmControler {
    #FilmModel
    constructor(db){
        this.#FilmModel = new FilmModel(db)
        this.getAll=this.getAll.bind(this)
        this.getBy=this.getBy.bind(this)
        this.create=this.create.bind(this)
        this.update=this.update.bind(this)
        this.delete= this.delete.bind(this)
    } 
    async getAll(req, res){
        try{
            const result = await this.#FilmModel.findAll()
            return res.status(200).send(result)
        }catch(err){
            res.status(400).json({message:'Error al cargar los cines', error: err})
        }
    }
        
    
    async getBy(req,res){
        try{
            const data = await this.#FilmModel.findBy({_id:ObjectId.createFromHexString(req.params.id)});
            if(data){
                return res.status(200).json({message:data})
            }else{
                return res.status(200).json({message:'No se encuentra la info en la base de datos'})
            }
        }catch(err){
            console.error('Error',err)
           return res.status(400).json({message: 'Info no encontrada'})
        }
        
        
    }
    async create(req, res){
        try{
            const creation = await this.#FilmModel.create(req.body)
            return res.status(200).json({message:'Cine creado con exito', creation})
        }catch(err){
            res.status(400).json({message:'Error al crear cine', error: err})
        }
    }
    async update(req,res){
        try{
            const result = await this.#FilmModel.update({_id:ObjectId.createFromHexString(req.params.id)}, {$set:req.body})
            return res.status(200).json({message:'Actualizado con exito', result})
        }catch(err){
            res.status(400).json({message:'Error al actualizar info', error: err})
        }
    }
        
    async delete (req,res){
        try{
            const result = await this.#FilmModel.delete({_id:ObjectId.createFromHexString(req.params.id)})
            return res.status(200).json({message:'Se pudo eliminar correctamente', result})
        }catch(err){
            res.status(400).json({message:'Error al eliminar cine', error: err})
        }
    }

}