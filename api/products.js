const express  = require('express');
const mongoose = require('mongoose');
const dotenv   = require('dotenv');
const path     = require('path');

// Încarcă variabilele din .env aflat în root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const Product = require('../src/models/Product');
const router  = express.Router();

// === DEFINE CRUD ROUTES ===

// CREATE
router.post('/', async (req, res) => {
  try {
    const p = new Product(req.body);
    await p.save();
    res.status(201).json(p);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// READ
router.get('/', async (_req, res) => {
  try {
    const list = await Product.find();
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Produs șters cu succes' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// === SETUP SERVERLESS HANDLER ===
const app = express();
app.use(express.json());
app.use('/api/products', router);

// Conectare Mongo odată
let isConnected = false;
async function connectDB() {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🟢 Conectat la MongoDB Atlas');
    isConnected = true;
  }
}

// Exportăm handler-ul pentru Vercel
module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};
