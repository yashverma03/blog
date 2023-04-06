import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const categoryModel = mongoose.model('category', CategorySchema);

export default categoryModel;
