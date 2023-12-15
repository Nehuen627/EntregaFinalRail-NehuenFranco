import productDao from "../dao/product.dao.js";

export default class {
    static async findOne(data) {
        return await productDao.findOne(data)
    }
    static async create(data) {
        return await productDao.create(data)
    }
    static async find(criteria) {
        return await productDao.find(criteria)
    }
    static async findById(pid) {
        return await productDao.findById(pid)
    }
    static async updateOne(criteria, operation) {
        return await productDao.updateOne(criteria, operation)
    }
    static async deleteOne(product) {
        return await productDao.deleteOne(product)
    }
}
