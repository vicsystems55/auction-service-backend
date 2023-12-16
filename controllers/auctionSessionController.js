import AuctionSession from '../models/auctionSessionModel.js';
import AuctionItem from '../models/auctionItemModel.js';

export const createAuctionSession = async (req, res) => {
  try {
    const { name, description, creator, endDate, auctionItem } = req.body;

    // Create a new auction session
    const newAuctionSession = new AuctionSession({
      name,
      description,
      creator,
      endDate,
      auctionItem,
    });

    // Validate and save the auction session
    await newAuctionSession.validate();
    await newAuctionSession.save();

    // Associate existing auction item if provided
    if (auctionItem) {
      // Check if the provided auctionItem ID exists
      const existingAuctionItem = await AuctionItem.findById(auctionItem);
      if (!existingAuctionItem) {
        return res.status(400).json({ error: 'Invalid auctionItem ID. Auction item does not exist.' });
      }

      // Update the auction session with the provided auction item ID
      newAuctionSession.auctionItem = auctionItem;
      await newAuctionSession.save();
    }

    res.status(201).json({
      message: 'Auction session created successfully',
      auctionSession: newAuctionSession,
    });
  } catch (error) {
    console.error('Error creating auction session:', error);
    res.status(500).json(error);
  }
};



// Controller function to view all auction sessions
export const viewAuctionSessions = async (req, res) => {
  try {
    const auctionSessions = await AuctionSession.find().populate('auctionItem');
    res.status(200).json({ auctionSessions });
  } catch (error) {
    console.error('Error fetching auction sessions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to view a specific auction session by ID
export const viewAuctionSessionById = async (req, res) => {
  try {
    const auctionSession = await AuctionSession.findById(req.params.id);
    if (!auctionSession) {
      return res.status(404).json({ error: 'Auction session not found' });
    }
    res.status(200).json({ auctionSession });
  } catch (error) {
    console.error('Error fetching auction session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to edit a specific auction session by ID
export const editAuctionSession = async (req, res) => {
  try {
    const updatedAuctionSession = await AuctionSession.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedAuctionSession) {
      return res.status(404).json({ error: 'Auction session not found' });
    }

    res.status(200).json({ message: 'Auction session updated successfully', auctionSession: updatedAuctionSession });
  } catch (error) {
    console.error('Error updating auction session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to delete a specific auction session by ID
export const deleteAuctionSession = async (req, res) => {
  try {
    const deletedAuctionSession = await AuctionSession.findByIdAndDelete(req.params.id);

    if (!deletedAuctionSession) {
      return res.status(404).json({ error: 'Auction session not found' });
    }

    res.status(200).json({ message: 'Auction session deleted successfully', auctionSession: deletedAuctionSession });
  } catch (error) {
    console.error('Error deleting auction session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
