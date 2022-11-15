import { MongoClient } from 'mongodb';
const dotenv = require('dotenv');
dotenv.config();
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.fy2mabq.mongodb.net/nextProductLab?retryWrites=true&w=majority`;
// const dbName = 'nextProductLab';

async function connectToDb() {
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db();

  setTimeout(() => client.close(), 1000);
  return db.collection('products');
};

async function getProducts() {
  const collection = await connectToDb()  
  return (await collection.find({})).toArray();
}

export default async function handler(req, res) {
  const results = await getProducts();
  return res.status(200).json(results);
}