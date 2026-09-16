const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],

        total: {
            type: Number,
            required: true,
        },

        shippingAddress: {
            firstName: String,
            lastName: String,
            email: String,
            phone: String,
            street: String,
            apartment: String,
            city: String,
            state: String,
            zip: String,
            country: String,
        },

        paymentStatus: {
            type: String,
            default: "Pending",
        },

        orderStatus: {
            type: String,
            enum: [
                "Pending",
                "Processing",
                "Shipped",
                "Delivered",
            ],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);