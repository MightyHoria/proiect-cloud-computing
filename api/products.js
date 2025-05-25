// api/products.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const Product = require('../src/models/Product');
const router = express.Router();

// CRUD routes:
router.post('/', async (req, res) => { /* … */ });
router.get('/',  async (req, res) => { /* … */ });
router.put('/:id', async (req, res) => { /* … */ });
router.delete('/:id', async (req, res) => { /* … */ });

// Bootstrap Express & Mongo:
const app = express();
app.use(express.json());
app.use('/api/products', router);

let conn;
module.exports = async (req, res) => {
  if (!conn) {
    conn = mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
  return app(req, res);
};
