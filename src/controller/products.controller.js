import productsService from '../service/products.service.js'
export default class {
    static async addProduct(data){
        const newProduct = await productsService.addProduct(data)
        return newProduct;
    }
    static async getProducts( query = {} ){
        const products = await productsService.getProducts(query)
        return products;
    }
    static async getProductById(pid){
        const product = await productsService.getProductById(pid)
        return product
    }
    static async updateProduct(pid, data) {
        const updatedProduct = await productsService.updateProduct(pid, data)
        return updatedProduct;
    }
    static async deletePoduct(pid){
        const deletedProduct = await productsService.deletePoduct(pid)
        return deletedProduct;
    }
}