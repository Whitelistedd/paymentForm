import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        CardNumber: {
            type: String,
            required: true,
            maxLength: 16,
        },
        ExpDate: {
            type: String,
            required: true,
        },
        Cvv: {
            type: String,
            required: true,
            maxLength: 3,
        },
        Amount: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema)

export default Order