import { Router } from 'express';
import ProductManager from '../dao/ProductsManager.js';


const router = Router();
/* const startAsync = async () => {
    for (let i = 1; i <= 10; i++) {
        let code = 'abc' + '1'.repeat(i);
        let newProduct = {
            title: "producto prueba",
            description: "este es un producto prueba",
            price: 200,
            thumbnail: "sin imagen",
            code: code,
            stock: 25,
            status: true,
            category: "pruebas",
        };

        await products_prueba.addProduct(newProduct);
    }
} */

router.get("/products",async (req, res) => {
    const limit = req.query.limit;

    try {
        const products = await ProductManager.getProducts();
        if(limit){
            products.splice(limit);
            const productsObj = {
                products: products
            }
            res.send(productsObj);
        } else {
            const productsObj = {
                products: products
            }
            res.status(200).send(productsObj);
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Error fetching products.");
    }
});

router.get("/products/:pid", async (req, res) => {
    const id = req.params.pid;

    try {
        const products = await ProductManager.getProductById(id);
        if(products){
            const productsObj = {
                product: products
            }
            res.send(productsObj);
        } else {
            const productsObj = {
                product: "There is no product by that id"
            }
            res.status(200).send(productsObj);
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Error fetching products.");
    }
});

router.post("/products", async (req, res) => {
    try{
        let { body : data } = req;
        data = {
            ...data,
        };
        let added = await ProductManager.addProduct(data);
        if(added){
            res.status(200).send(data)
        } else {
            res.status(400).send(data)
        }
    } 
    catch (error) {
        console.error("Error adding product:", error);
        res.status(500).send("Error adding product.");
    }
})

router.put("/products/:pid", async (req, res) => {
    const id = req.params.pid;
    try {
        const products = await ProductManager.getProductById(id)
        if(!products){
            const productsObj = {
                product: "There is no product by that id"
            }
            res.status(404).send(productsObj);
        } else {
            let { body : data } = req;
            data = {
                ...data,
            };
            await ProductManager.updateProduct(id, data);
            const newProduct = await ProductManager.getProductById(id)
            res.status(200).send(newProduct);
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Error fetching products.");
    }
})

router.delete("/products/:pid", async (req, res) => {
    const id = req.params.pid;
    try {
        let deleted = await ProductManager.deletePoduct(id)
        res.status(200).send(`The product is deleted? : ${deleted}`);
    }
    catch (error){
        console.error("Error deleting product:", error);
        res.status(500).send("Error deleting product");
    }
})


export default router;
