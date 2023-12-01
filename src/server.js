import { init } from './db/mongodb.js';
import http from 'http';
import app from './app.js';
import config from './config/envConfig.js'

const server = http.createServer(app);
await init();

const PORT = config.port;

server.listen(PORT, () => {
    console.log(`Server running into http://localhost:${PORT}`);
});

