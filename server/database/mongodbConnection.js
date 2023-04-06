import mongoose from 'mongoose';

const mongodbConnection = async () => {
  const URL = process.env.DB_URI;

  try {
    await mongoose.connect(URL, { useNewUrlParser: true });
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Error while connecting to the database ', error);
  }
};

export default mongodbConnection;
