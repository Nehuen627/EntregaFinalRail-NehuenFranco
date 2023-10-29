import { Router } from 'express';
import CartManager from '../dao/CartManager.js';
import productsManager from '../dao/ProductsManager.js'

const router = Router();
router.post("/carts", async (req, res) => {
    try {
        let { body: data } = req;
        const cart = await CartManager.addCart(data);

        if (!cart) {
            return res.status(404).send("Cart not created.");
        }

        res.status(201).send({
            message: "Cart created successfully",
            cartId: cart._id
        });
    } catch (error) {
        console.error("Error adding cart:", error);
        res.status(500).send("Error adding cart.");
    }
});

router.get("/carts/:cid", async (req, res) => {
    const id = req.params.cid;

    try {
        const cart = await CartManager.getCartContentById(id);
        if(cart){
            res.status(200).send(cart);
        } else {
            const cartArray = {
                product: "There is no cart by that id"
            }
            res.status(404).send(cartArray);
        }
    } catch (error) {
        console.error("Error finding cart:", error);
        res.status(500).send("Error finding cart.");
    }
})

router.post("/carts/:cid/product/:pid", async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    
    try {
        const product = await productsManager.getProductById(idProduct); 

        if(product){
            const productsObj = {
                productId: idProduct,
                quantity: 1
            };
            
            let added = await CartManager.addProductToCart(idCart, productsObj);
            
            if(added){
                res.status(200).send("Product added");
            } else {
                res.status(400).send({ message: "Error adding the product to the cart" }); 
            }
        } else {
            console.log("Product not found");
            res.status(404).send({ message: "Product not found" }); 
        }
    }
    catch (error) {
        console.error("Error updating the cart or adding the product:", error);
        res.status(500).send("Error updating the cart or adding the product");
    }
});
export default router;
