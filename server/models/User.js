import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
avatarUrl: {
  type: String,
  default: '',
},
});

export default mongoose.model('User', userSchema);
