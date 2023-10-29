import mongoose from 'mongoose';

export const init = async () => {
    try {
        const URI = 'mongodb+srv://developer:18JhiKOtwG5MqtTP@cluster0.k1ea6t4.mongodb.net/';
        
        await mongoose.connect(URI);
        console.log('Database conected');
    } catch (error) {
        console.log('Ah ocurrido un error al intentar conectarnos a la DB', error.message);
    }
}