import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import auctionItemsRoutes from './routes/auctionItemRoutes.js';
import auctionSessionRoutes from './routes/auctionSessionRoutes.js';
import bidRoutes from './routes/bidRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.error('MongoDB Connection Error: ', err);
  });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auction-items', auctionItemsRoutes);
app.use('/api/auction-session', auctionSessionRoutes);
app.use('/api/bid', bidRoutes);



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
