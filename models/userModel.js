import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Add other user properties as needed
});

const User = mongoose.model('User', userSchema);

export default User;

