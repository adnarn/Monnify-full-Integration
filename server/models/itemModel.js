import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    price: {
        type: Number,
        required: true,
    },
    quatity: {
        type: Number, 
        required: true,
        default: 1,
    },
    description: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const Item = mongoose.model('Items', itemSchema);

export default Item;
