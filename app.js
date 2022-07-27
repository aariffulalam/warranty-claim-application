const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();

const config =  require("./config/cofiguration")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api', require('./routes/api.route'));

// user Api
app.use("/user", require('./routes/user.route'))
app.use("/seller", require('./routes/seller.route'))
app.use("/product", require('./routes/product.route'))

// warranty
app.use('/warranty', require('./routes/warranty.route'))

// buy
app.use('/buy', require('./routes/buy.route'))

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = config.port || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
