import express from "express"
import path from "path"
import cartRouter from "./routers/cart.router.js"
import productsRouter from "./routers/products.router.js"
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
import UsersManager from "./dao/UsersManager.js";
import chatRouter from "./routers/chat.router.js"
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.get('/', (req , res)=>{
    res.render('login');
});


let storedUserData = null;

app.post('/api/register', async (req, res) => {
    try {
        await UsersManager.addUser(req.body);
        res.status(201).json({ message: 'Registered successfully' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const user = await UsersManager.getUserData(req.body.email, req.body.password);
        storedUserData = user
        res.json(user);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});


app.get('/main', (req, res) => {
    console.log(storedUserData)
    res.render('home', storedUserData);
});


app.use((error, req, res, next) => {
    const errorMessage = `An error was recorded: ${error}`;
    console.log(errorMessage);
    res.status(500).json({status: 'error', errorMessage})
})


app.use('/api', cartRouter, productsRouter, chatRouter);

export default app;