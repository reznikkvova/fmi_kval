const { Schema, model } = require('mongoose');

const schema = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

module.exports = model('User', schema);
