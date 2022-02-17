const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema({
    ProductName: {
        type: String
    },
    ProductDescription: {
        type: String
    },
    ProductPrice: {
        type: Number
    }
},{
        collection: 'Poduct'
});

module.exports = mongoose.model('Product', Product);