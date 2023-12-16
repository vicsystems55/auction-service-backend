import mongoose from 'mongoose';

const auctionSessionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async function (value) {
        const user = await mongoose.model('User').findById(value);
        return user !== null;
      },
      message: 'Invalid creator ID. User does not exist.',
    },
  },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  auctionItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AuctionItem',
    unique: true, // Ensure a unique constraint for the auctionItem field
    sparse: true, // Allows multiple documents without an auctionItem field
    validate: {
      validator: async function (value) {
        if (!value) return true; // Allow null (no auction item)
        const auctionItem = await mongoose.model('AuctionItem').findById(value);
        return auctionItem !== null;
      },
      message: 'Invalid auction item ID. Auction item does not exist.',
    },
  },
});

const AuctionSession = mongoose.model('AuctionSession', auctionSessionSchema);

export default AuctionSession;
