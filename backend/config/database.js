import mongoose from 'mongoose';

export default async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Falta configurar MONGODB_URI en backend/.env.');
  await mongoose.connect(uri);
  console.log('Conexión con MongoDB establecida.');
}
