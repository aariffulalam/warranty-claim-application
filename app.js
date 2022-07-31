const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();
const cors= require('cors');

const config =  require("./config/cofiguration")

const app = express();
app.use(cors())
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});


// warranty
app.use('/warranty', require('./routes/warranty.route'))


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
