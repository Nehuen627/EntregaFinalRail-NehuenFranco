import express from "express"
import path from "path"
import { fileURLToPath } from 'url';
import cartRouter from "./routers/cart.router.js"
import productsRouter from "./routers/products.router.js"


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, '../public')));

app.get('/', (req , res)=>{
    res.send('Inicio')
});


app.use('/api', cartRouter, productsRouter);

app.listen(8080, () => {
    console.log('🚀 Server running on http://localhost:8080');
});
