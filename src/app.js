const express  = require('express');
const mongoose = require('mongoose');
const dotenv   = require('dotenv');
const path     = require('path');
const productRoutes = require('./routes/productRoutes');

dotenv.config();                         // încarcă .env înainte de orice
const app = express();

// 1) JSON-body parsing
app.use(express.json());

// 2) Servești frontend-ul static
app.use(express.static(path.join(__dirname, '../public')));

// 3) API-ul tău de produse
app.use('/api/products', productRoutes);

// 4) SPA fallback → index.html pentru orice rută necunoscută
app.use((_, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 5) Conectare la MongoDB Atlas și pornire server
mongoose
  .connect(process.env.MONGO_URI)          // fără opțiuni deprecate
  .then(() => {
    console.log('🟢 Conectat la MongoDB Atlas');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server pe portul ${PORT}`));
  })
  .catch(err => console.error('🔴 Eroare la conectare MongoDB:', err));
