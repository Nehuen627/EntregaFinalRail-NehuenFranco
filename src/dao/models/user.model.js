import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String, 
    email: {
        type: String,
        unique: true,  
        sparse: true,  
    },
    age: Number,
    password: String, 
    role: {type: String, default: "user"},
    cart: { type: mongoose.Schema.Types.ObjectId,
            ref: 'Carts', 
        },
    provider: { type: String, default: "app" },
    githubId: { type: String, unique: true, sparse: true, default: undefined },
}, { timestamps: true });

userSchema.pre('findOne', function() {
    this.populate('cart.cartId');
});


export default mongoose.model('User', userSchema);