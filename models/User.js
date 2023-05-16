const { Schema, model } = require('mongoose');

const schema = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  isAdmin: {type: String, required: true},
  phone: {type: String},
  deliveryCity: {type: String},
  deliveryAddress: {type: String},
});

module.exports = model('User', schema);
