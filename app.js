const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const PORT = config.get('port') || 5000;
const app = express();
const path = require('path');


app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/cart', require('./routes/cart.router'))
app.use('/api/tire-crud', require('./routes/tire-crud.router'))
app.use('/api/brand-crud', require('./routes/brand-crud.router'))
app.use('/api/user-crud', require('./routes/user-crud.router'))



const prod = true;

if (prod) {
  app.use(express.static(path.join(__dirname, './client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
  });
}


async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(5000, () => console.log(`App has been started on port ${PORT} `));
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
}
start();






