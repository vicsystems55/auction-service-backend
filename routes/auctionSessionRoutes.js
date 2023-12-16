import express from 'express';
import { createAuctionSession, viewAuctionSessions, viewAuctionSessionById, editAuctionSession, deleteAuctionSession } from '../controllers/auctionSessionController.js';

const router = express.Router();

// Define user routes
router.post('/', createAuctionSession);
router.get('/', viewAuctionSessions);
router.get('/:id', viewAuctionSessionById);
router.put('/:id', editAuctionSession);
router.delete('/:id', deleteAuctionSession);

export default router;
