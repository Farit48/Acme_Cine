


export default class Usermodel {
    #user

    constructor(db){
        this.#user = db

    }
    async findAll(){
        return await this.#user.find().toArray();
    }
    async findBy(filter){
        return await this.#user.findOne(filter);
    }
    async create(data){
        return await this.#user.insertOne(data);
    }
    async update(_id, updatedData){
        return await this.#user.updateOne(_id,updatedData);
    }
    async delete(_id){
        return await this.#user.deleteOne(_id);
    }

}