import mongoose from 'mongoose';

const TokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

const tokenModel = mongoose.model('token', TokenSchema);

export default tokenModel;
