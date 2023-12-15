import cartDao from "../dao/cart.dao.js";
export default class {
    static async create(userEmail) {
        return await cartDao.create(userEmail)
    }
    static async findById(cid) {
        return await cartDao.findById(cid)
    }
    static async findOneAndUpdate(criteria) {
        return await cartDao.findOneAndUpdate(criteria)
    }
    static async find() {
        return await cartDao.find()
    }
}