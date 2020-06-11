require('dotenv').config();
import { connectDatabase } from '../src/database';

const clear = async () => {
  try {
    console.log('[clear]: running...');
    const db = await connectDatabase();
    const items = await db.items.find({}).toArray();
    const suppliers = await db.suppliers.find({}).toArray();
    const orders = await db.orders.find({}).toArray();
    if (items.length) {
      await db.items.drop();
    }
    if (suppliers.length) {
      await db.suppliers.drop();
    }
    if (orders.length) {
      await db.orders.drop();
    }
    console.log('[seed]: success')
  } catch {
    throw new Error('failed to clear database');
  }
}

clear();