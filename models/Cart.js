const { Schema, model } = require('mongoose');

const schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    products: [
        {
            productId: Number,
            quantity: Number,
            price: Number
        }
    ]
});

module.exports = model('Cart', schema);
