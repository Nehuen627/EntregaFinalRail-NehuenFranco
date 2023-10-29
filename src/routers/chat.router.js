
import { Router } from 'express';
import messagesModel from '../dao/models/messages.model.js';

const router = Router();
router.get('/messages', async (req, res) => {
    const userEmail = req.query.user;   
    const messages = await messagesModel.find();
    const cleanMessages = messages.map(message => ({ userEmail: message.userEmail, message: message.message }));
    res.render('chat', { messages: cleanMessages, userEmail: userEmail });

});


router.post('/messages', async (req, res) => {
    const { user: userEmail, message } = req.body;
    if (!userEmail || !message) {
        return res.status(400).json({ error: 'Both userEmail and message are required' });
    }
    const newMessage = await messagesModel.create({ userEmail, message });
    res.status(201).json(newMessage);
});

export default router;
