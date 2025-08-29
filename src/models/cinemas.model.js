export default class Cinemamodel {
    #cinema

    constructor(db){
        this.#cinema = db

    }
    async findAll(){
        return await this.#cinema.find().toArray();
    }
    async findBy(filter){
        return await this.#cinema.findOne(filter);
    }
    async create(data){
        return await this.#cinema.insertOne(data);
    }
    async update(_id, updatedData){
        return await this.#cinema.updateOne(_id,updatedData);
    }
    async delete(_id){
        return await this.#cinema.deleteOne(_id);
    }

}