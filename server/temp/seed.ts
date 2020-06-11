require('dotenv').config();
import { connectDatabase } from '../src/database';
import { Order, Item, Supplier } from '../src/lib/types';
import { ObjectId } from 'mongodb';

const items: Item[] = [
  {
    _id: new ObjectId("5d378db94e84753160e08b30"),
    title: "Macbook"
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b31"),
    title: "Book 'Guide to Hamburg'"
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b32"),
    title: "Book 'Cooking 101'"
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b33"),
    title: "Inline Skates"
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b34"),
    title: "Playstation"
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b35"),
    title: "Flux Copacitor"
  },
];
const suppliers: Supplier[] = [
  {
    _id: new ObjectId("5d378db94e84753160e08b36"),
    title: "SuperTrader"
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b37"),
    title: "Cheapskates"
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b38"),
    title: "MegaCorp"
  }
];
const orders: Order[] = [
  {
    _id: new ObjectId("5d378db94e84753160e08b39"),
    supplier: new ObjectId("5d378db94e84753160e08b36"),
    customerAddress: "Steindamm 80",
    items: [
      new ObjectId("5d378db94e84753160e08b30")
    ]
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b40"),
    supplier: new ObjectId("5d378db94e84753160e08b37"),
    customerAddress: "Reeperbahn 153",
    items: [
      new ObjectId("5d378db94e84753160e08b30")
    ]
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b41"),
    supplier: new ObjectId("5d378db94e84753160e08b38"),
    customerAddress: "Steindamm 80",
    items: [
      new ObjectId("5d378db94e84753160e08b31")
    ]
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b42"),
    supplier: new ObjectId("5d378db94e84753160e08b36"),
    customerAddress: "Sternstrasse 125",
    items: [
      new ObjectId("5d378db94e84753160e08b32")
    ]
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b43"),
    supplier: new ObjectId("5d378db94e84753160e08b36"),
    customerAddress: "Sternstrasse 125",
    items: [
      new ObjectId("5d378db94e84753160e08b33")
    ]
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b44"),
    supplier: new ObjectId("5d378db94e84753160e08b38"),
    customerAddress: "Reeperbahn 153",
    items: [
      new ObjectId("5d378db94e84753160e08b34")
    ]
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b45"),
    supplier: new ObjectId("5d378db94e84753160e08b37"),
    customerAddress: "Lagerstrasse 11",
    items: [
      new ObjectId("5d378db94e84753160e08b35")
    ]
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b46"),
    supplier: new ObjectId("5d378db94e84753160e08b36"),
    customerAddress: "Reeperbahn 153",
    items: [
      new ObjectId("5d378db94e84753160e08b33")
    ]
  },
];

const seed = async () => {
  try {
    console.log("starting seed...");
    const db = await connectDatabase();
    for (const item of items) {
      await db.items.insertOne(item)
    }
    for (const supplier of suppliers) {
      await db.suppliers.insertOne(supplier);
    }
    for (const order of orders) {
      await db.orders.insertOne(order);
    }
  } catch (error) {
    throw new Error(`Error seeding data: ${error}`)
  }
  console.log("seeding completed successfully")
}

seed();