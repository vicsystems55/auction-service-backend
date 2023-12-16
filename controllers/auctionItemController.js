import AuctionItem from '../models/auctionItemModel.js';

export const createAuctionItem = async (req, res) => {
  try {
    const { name, price, status, img_url } = req.body;

    const newAuctionItem = new AuctionItem({
        name,
        price,
        status,
        img_url,
    });

    await newAuctionItem.save();

    res.status(201).json({ message: 'Auction item created successfully', newAuctionItem: newAuctionItem });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const fetchAuctionItems = async (req, res) => {
  try {
    const auctionItems = await AuctionItem.find();
    res.status(200).json({ auctionItems });
  } catch (error) {
    console.error('Error fetching auction items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};