import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    customerName : {type: String, required: true},
    customerEmail: {type: String, required: true},
    paymentReference: {type: String, required: true},
    amount: {type: Number, required: true},
    status: {type: String, default: "pending"},
    date: {type: Date, default: Date.now()}
},{timestamps: true})

const Payment = mongoose.model("Payment", paymentSchema)

export default Payment