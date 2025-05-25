const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const productRoutes = require('./routes/productRoutes');

console.log('→ MONGO_URI:', process.env.MONGO_URI);


dotenv.config();
const app = express();

// 1) JSON-body parsing
app.use(express.json());

// 2) Servim front-end-ul static
app.use(express.static(path.join(__dirname, '../public')));

// 3) API-ul nostru
app.use('/api/products', productRoutes);

// 4) SPA fallback: orice cerere nepreluată mai sus → index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 5) Conectare la MongoDB Atlas + pornire server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('🟢 Conectat la MongoDB Atlas');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server pe portul ${PORT}`));
  })
  .catch(err => console.error('🔴 Eroare la conectare MongoDB:', err));
