import User from '../models/userModel.js';

// Controller function to create a new user
export const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    // Validate request data if needed

    const newUser = new User({
      username,
      email,
      // Set other user properties as needed
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: error });
  }
};


export const fetchUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};