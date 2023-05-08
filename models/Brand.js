const { Schema, model } = require('mongoose');

const schema = new Schema({
    id: { type: String, require: true },
    name: { type: String, require: true, unique: true },
    country: { type: String, require: true }
});

module.exports = model('Brand', schema);
