import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
  auctionSession: { type: mongoose.Schema.Types.ObjectId, ref: 'AuctionSession', required: true }, 
  bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Bid = mongoose.model('Bid', bidSchema);

export default Bid;
