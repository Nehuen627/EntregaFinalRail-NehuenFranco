import cartsModel from './models/carts.model.js';
import { Exception } from '../utils.js';

export default class {
    static async addCart(products){

        if (!Array.isArray(products.products) || products.products.length === 0) {
            console.error("There is no product to create the cart");
            return false;
        }        
        
        const newCart = await cartsModel.create({ products: products.products });
        return newCart;

    }
    static async getCartContentById(cid){
        const cart = await cartsModel.findById(cid);
        if(!cart){
            throw new Exception("There is no cart by that id", 404);
        }
        return cart;
    }
    static async addProductToCart(cid, product){
        const cart = await cartsModel.findById(cid);
        if(!cart){
            throw new Exception("There is no cart by that id", 404);
        }
    
        const existingProductIndex = cart.products.findIndex(p => p.productId.toString() === product.productId.toString());
    
        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity++;
        } else {
            cart.products.push(product);
        }
    
        await cart.save();
        return true;
    }
}