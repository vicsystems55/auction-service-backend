import Bid from '../models/bidModel.js'; // Adjust the path accordingly

const BidController = {
    createBid: async (req, res) => {
        try {
          const bid = new Bid(req.body);
          await bid.save();
          res.status(201).json(bid);
        } catch (error) {
          if (error.code === 11000 && error.keyPattern && error.keyPattern.bidder && error.keyPattern.amount && error.keyPattern.auctionSession) {
            // Duplicate key violation, i.e., the combination of bidder, amount, and auctionSession is not unique
            return res.status(400).json({ error: 'Invalid bid. This combination already exists.' });
          }
    
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },

  getAllBids: async (req, res) => {
    try {
      const bids = await Bid.find();
      res.json(bids);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getBidById: async (req, res) => {
    try {
      const bid = await Bid.findById(req.params.id);
      if (!bid) {
        return res.status(404).json({ error: 'Bid not found' });
      }
      res.json(bid);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateBidById: async (req, res) => {
    try {
      const bid = await Bid.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!bid) {
        return res.status(404).json({ error: 'Bid not found' });
      }
      res.json(bid);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteBidById: async (req, res) => {
    try {
      const bid = await Bid.findByIdAndDelete(req.params.id);
      if (!bid) {
        return res.status(404).json({ error: 'Bid not found' });
      }
      res.json({ message: 'Bid deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default BidController;
