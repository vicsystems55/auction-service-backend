import mongoose from 'mongoose';

const auctionItemSchema = new mongoose.Schema({
  name: { type: String, required: false },
  price: { type: String, required: true, unique: false },
  status: { type: String, required: true },
  img_url: { type: String, required: false, unique: true },
});

const AuctionItem = mongoose.model('AuctionItem', auctionItemSchema);

export default AuctionItem;

