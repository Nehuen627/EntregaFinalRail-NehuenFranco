import { init } from './db/mongodb.js';
import http from 'http';
import app from './app.js';
import { Server } from 'socket.io';


const server = http.createServer(app);
const PORT = 8080;
export const socketServer = new Server(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});


socketServer.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('new message', (message) => {
        socketServer.emit('new message', message);
    });
});


await init();



server.listen(PORT, () => {
    console.log(`Server running into http://localhost:${PORT}`);
});

