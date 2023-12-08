import productDao from "../dao/product.dao.js";

export default class {
    static async addProduct(data){
        return productDao.addProduct(data)
    }
    static async getProducts( query = {} ){
        return productDao.getProducts(query = {})
    }
    static async getProductById(pid){
        return productDao.getProductById(pid)
    }
    static async updateProduct(pid, data) {
        return productDao.updateProduct(pid, data)
    }
    static async deletePoduct(pid){
        return productDao.deletePoduct(pid)
    }
}