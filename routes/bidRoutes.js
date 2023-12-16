import express from 'express';
import BidController from '../controllers/bidController.js'; // Adjust the path accordingly

const router = express.Router();

// Create a new bid
router.post('/', BidController.createBid);

// Get all bids
router.get('/', BidController.getAllBids);

// Get a specific bid by ID
router.get('/:id', BidController.getBidById);

// Update a bid by ID
router.put('/:id', BidController.updateBidById);

// Delete a bid by ID
router.delete('/:id', BidController.deleteBidById);

export default router;
