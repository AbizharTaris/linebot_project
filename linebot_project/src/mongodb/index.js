import mongoose from 'mongoose';

export default function databaseConnection() {
  const config = mongoose.connect(`mongodb://localhost:27017/linebot`, config);
}
