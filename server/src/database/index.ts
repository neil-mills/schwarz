import { MongoClient } from 'mongodb';
const { DB_USER, DB_USER_PASSWORD, DB_CLUSTER } = process.env;
const url = `mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@${DB_CLUSTER}.mongodb.net/test?retryWrites=true&w=majority`;
import { Item, Supplier, Order, Database } from '../lib/types';

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db('schwarz');
  return {
    items: db.collection<Item>('items'),
    suppliers: db.collection<Supplier>('suppliers'),
    orders: db.collection<Order>('orders')
  }
}