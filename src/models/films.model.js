export default class FilmModel {
    #film

    constructor(db){
        this.#film = db

    }
    async findAll(){
        return await this.#film.find().toArray();
    }
    async findBy(filter){
        return await this.#film.findOne(filter);
    }
    async create(data){
        return await this.#film.insertOne(data);
    }
    async update(_id, updatedData){
        return await this.#film.updateOne(_id,updatedData);
    }
    async delete(_id){
        return await this.#film.deleteOne(_id);
    }

}