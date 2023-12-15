import express from 'express';
import { createAuctionItem, fetchAuctionItems } from '../controllers/auctionItemController.js';

const router = express.Router();

// Define user routes
router.get('/', fetchAuctionItems);
router.post('/create', createAuctionItem);

export default router;
