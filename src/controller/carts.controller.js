import cartsService from "../service/carts.service.js";
export default class {
    static async addCart(userEmail){ 
        const cart = await cartsService.addCart(userEmail);
        return cart;
    }

    static async getCartContentById(cid) {
        const cart = await cartsService.getCartContentById(cid);
        return cart;
    }
    
    static async addProductToCart(cid, product) {
        const cart = await cartsService.addProductToCart(cid, product);
        return cart;
    }
    
    static async deleteProductOfCart(cid, pid) {
        const cart = await cartsService.deleteProductOfCart(cid, pid);
        return cart;
    }
    
    static async updateProductsArrayOfCart(cid, products) {
        const cart = await cartsService.updateProductsArrayOfCart(cid, products);
        return cart
    }
    
    
    static async updateProductQuantityToCart(cid, pid, quantity) {
        const cart = await cartsService.updateProductQuantityToCart(cid, pid, quantity);
        return cart;
    }
        
    static async deleteProductsOfCart(cid) {
        const cart = await cartsService.deleteProductsOfCart(cid);
        return cart;
    }
    static async getCarts() {
        const carts = await cartsService.getCarts();
        return carts;
    }
}