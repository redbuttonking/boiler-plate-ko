const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');

mongoose
  .connect('mongodb+srv://gustnqkr0414:abcd1234@cluster0.hkhtemw.mongodb.net/')
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('hello world'));

app.listen(port, () => console.log(`Example app listening on port ${port}~!`));
