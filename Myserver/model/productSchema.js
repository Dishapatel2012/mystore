const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    productName: {
        type: String,   
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },  
    productPrice: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);