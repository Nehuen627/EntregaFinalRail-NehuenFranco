import { Router } from 'express';
import cartsController from '../controller/carts.controller.js';
import productsController from '../controller/products.controller.js'
import { isAdmin } from '../utils.js';


const router = Router();

router.post("/carts", async (req, res) => {
    try {
        let { body: data } = req;
        const cart = await cartsController.addCart(data);

        if (cart) {
            res.status(201).send({
                message: "Cart created successfully",
                cart: cart
            });
        } else {
            res.status(404).send("Cart not created.");
        }
    } catch (error) {
        console.error("Error adding cart:", error);
        res.status(500).send("Error adding cart.");
    }
});

router.get("/carts/:cid", async (req, res) => {
    const id = req.params.cid;
    try {
        const cart = await cartsController.getCartContentById(id);
        if (cart) {
            res.render('cart', { cart: cart, user: req.user });
        } else {
            res.status(404).send({ message: "There is no cart by that id" });
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
        const product = await productsController.getProductById(idProduct);

        if (product) {
            const productsObj = {
                productId: idProduct,
                quantity: 1
            };

            const updatedCart = await cartsController.addProductToCart(idCart, productsObj);

            if (updatedCart) {
                res.redirect(`/api/carts/${idCart}`);
                updatedCart.totalPrice += product.price;
                updatedCart.save()
            } else {
                res.status(400).send({ message: "Error adding the product to the cart" });
            }
        } else {
            console.log("Product not found");
            res.status(404).send({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error updating the cart or adding the product:", error);
        res.status(500).send("Error updating the cart or adding the product");
    }
});

router.delete("/carts/:cid/product/:pid", async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;

    try {
        const cart = await cartsController.getCartContentById(idCart);
        
        if (!cart) {
            return res.status(404).send({ message: "Cart not found" });
        }

        const productsToRemove = cart.products.filter(product => product.productId._id.toString() === idProduct.toString());

        if (productsToRemove.length > 0) {
            const totalRemovedPrice = productsToRemove.reduce((total, product) => total + (product.productId.price * product.quantity), 0);

            cart.totalPrice -= totalRemovedPrice;

            cart.products = cart.products.filter(product => product.productId._id.toString() !== idProduct.toString());

            await cart.save();
            return res.status(200).send({ message: "Products deleted" });
        } else {
            return res.status(404).send({ message: "Products not found in the cart" });
        }
    } catch (error) {
        console.error("Error updating the cart or deleting the products:", error);
        res.status(500).send("Error updating the cart or deleting the products");
    }
});

router.put("/carts/:cid", async (req, res) => {
    const idCart = req.params.cid;
    const products = req.body;

    try {
        const updatedCart = await cartsController.updateProductsArrayOfCart(idCart, products);

        if (updatedCart) {
            res.status(200).send({ message: "Products in the cart updated", cart: updatedCart });
        } else {
            res.status(400).send({ message: "Error updating the products in the cart" });
        }
    } catch (error) {
        console.error("Error updating the cart or the products:", error);
        res.status(500).send("Error updating the cart or the products");
    }
})

router.put("/carts/:cid/product/:pid", async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    const { quantity } = req.body; 

    try {
        const updatedCart = await cartsController.updateProductQuantityToCart(idCart, idProduct, quantity);

        if (updatedCart) {
            res.status(200).send({ message: "Product quantity in the cart updated", cart: updatedCart });
        } else {
            res.status(400).send({ message: "Error updating the product quantity in the cart" });
        }
    } catch (error) {
        console.error("Error updating the cart or the product quantity:", error);
        res.status(500).send("Error updating the cart or the product quantity");
    }
})

router.delete("/carts/:cid", async (req, res) => {
    const idCart = req.params.cid;
    try {
        const updatedCart = await cartsController.deleteProductsOfCart(idCart);

        if (updatedCart) {
            res.status(200).send({ message: "All products deleted from the cart", cart: updatedCart });
        } else {
            res.status(400).send({ message: "Error deleting the products from the cart" });
        }
    } catch (error) {
        console.error("Error updating the cart or deleting the products:", error);
        res.status(500).send("Error updating the cart or deleting the products");
    }
})
router.get("/carts", isAdmin, async (req, res) => {
    try {
        const carts = await cartsController.getCarts();
        for (let i = 0; i < carts.length; i++) {
            const element = carts[i];
            element.title = i;
        }
        if (carts) {
            res.render('cartsList', { carts });
        } else {
            res.status(400).send({ message: "No carts found" })
        }
    }
    catch (error) {
        console.error("Error getting carts:", error);
        res.status(500).send("Error getting carts");
    }
})


export default router;
