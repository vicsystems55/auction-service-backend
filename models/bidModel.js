import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
  auctionSession: { type: mongoose.Schema.Types.ObjectId, ref: 'AuctionSession', required: true }, 
  bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Compound index to enforce uniqueness on bidder, amount, and auctionSession
bidSchema.index({ bidder: 1, amount: 1, auctionSession: 1 }, { unique: true });

const Bid = mongoose.model('Bid', bidSchema);

export default Bid;
