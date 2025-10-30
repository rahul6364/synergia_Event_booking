const mongoose=require('mongoose')
const dotenv=require('dotenv')

const express=require('express')
const app=express()
app.use(express.json())
const bookingRoutes=require('./routes/bookingRoutes.js')

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ Missing MONGO_URI in environment. Please set it in .env');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
.then(() => console.log("✅ Connected to MongoDB (synergiaDB)"))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});

app.use('/api/bookings',bookingRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});