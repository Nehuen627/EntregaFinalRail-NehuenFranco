import { Exception } from '../utils.js';
import productsService from '../service/products.service.js'
export default class {
    static async addProduct(data){
        const isAdded = await productsService.findOne(data);
        if(isAdded){
            throw new Exception("There is a product already added with the same code", 404);
        }
        const newProduct = await productsService.create(data);
        return newProduct
    }
    static async getProducts( query = {} ){
        const criteria = {};
        if (query.category) {
            criteria.category = query.category;
        }
        return productsService.find(criteria);
    }
    static async getProductById(pid){
        const product = await productsService.findById(pid);
        if(!product){
            throw new Exception("There is no product by that id", 404);
        }
        return product;
    }
    static async updateProduct(pid, data) {
        const product = await productsService.findById(pid);
    
        if (!product) {
            throw new Exception("There is no product by that id", 404);
        }
    
        const criteria = { _id: pid };
        const operation = { $set: data };
    
        const updatedProduct = await productsService.updateOne(criteria, operation);
    
        if (data.stock === 0) {
            await productsService.updateOne({ _id: pid }, { $set: { status: false } });
        }
    
        return updatedProduct;
    }
    
    static async deletePoduct(pid){
        const product = await productsService.findById(pid);
        if(!product){
            throw new Exception("There is no product by that id", 404);
        }
        return await productsService.deleteOne(product);
    }
}