import ticketService from "../service/ticket.service.js";
import { nanoid } from "nanoid";
import cartsController from "./carts.controller.js";
import productsController from "./products.controller.js";
export default class {
    static async createTicket(cid, userEmail) {
        const cartData = await cartsController.getCartContentById(cid);
        const purchasedProductsData = [];
        let amount = 0;
    
        for (const product of cartData.products) {
            const productId = product.productId._id;
            const quantity = product.quantity;
    
            const existingProduct = await productsController.getProductById(productId);
    
            if (existingProduct.status === true && existingProduct.stock >= quantity) {
                const updatedStock = existingProduct.stock - quantity;
    
                await productsController.updateProduct(productId, {
                    stock: updatedStock,
                });
    
                let productData = {
                    productId,
                    quantity,
                };
    
                amount += existingProduct.price * quantity;
                purchasedProductsData.push(productData);
    
                await cartsController.deleteProductOfCart(cid, productId);
            } else {
                if (existingProduct.status === false) {
                    console.log(`You cannot purchase the item ${productId} because it is not available.`);
                } else {
                    console.log(`There is not enough stock of the product ${productId}.`);
                }
            }
        }
    
        const uniqueCode = nanoid();
        const date = new Date();
        return await ticketService.createTicket(uniqueCode, date, amount, userEmail, purchasedProductsData);
    }
    
}