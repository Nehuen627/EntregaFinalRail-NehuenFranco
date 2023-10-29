import mongoose from 'mongoose';

const cartsSchema = new mongoose.Schema({
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true
});

export default mongoose.model('Carts', cartsSchema);