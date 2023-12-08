import cartDao from "../dao/cart.dao.js";
export default class {
    static async addCart(userEmail){ 
        const cart = await cartDao.addCart(userEmail);
        return cart
    }

    static async getCartContentById(cid) {
        const cart = await cartDao.getCartContentById(cid);
        return cart
    }
    
    static async addProductToCart(cid, product) {
        const cart = await cartDao.addProductToCart(cid, product);
        return cart
    }
    
    static async deleteProductOfCart(cid, pid) {
        const cart = await cartDao.deleteProductOfCart(cid, pid);
        return cart
    }
    
    static async updateProductsArrayOfCart(cid, products) {
        const cart = await cartDao.updateProductsArrayOfCart(cid, products);
        return cart
    }
    
    
    static async updateProductQuantityToCart(cid, pid, quantity) {
        const cart = await cartDao.updateProductQuantityToCart(cid, pid, quantity);
        return cart
    }
        
    static async deleteProductsOfCart(cid) {
        const cart = await cartDao.deleteProductsOfCart(cid);
        return cart
    }
    static async getCarts() {
        const carts = await cartDao.getCarts();
        return carts
    }
}