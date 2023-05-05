const { Schema, model } = require('mongoose');

const schema = new Schema({
    id: { type: String, require: true, unique: true },
    brand: { type: String, require: true },
    diameter: {type: String, required: true},
    width: {type: String, required: true},
    height: {type: String, required: true},
    construction: {type: String, required: true},
    speedIndex: {type: String, required: true},
    countAvailable: {type: String},
    season: {type: String},
    image: {type: String}
});

module.exports = model('Tire', schema);
