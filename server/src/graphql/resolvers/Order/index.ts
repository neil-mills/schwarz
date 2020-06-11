import { IResolvers } from 'apollo-server-express';
import { Order, Database } from '../../../lib/types';
import { ObjectId } from 'mongodb';

interface Args {
  filters?: {
    supplier?: string | undefined;
    customerAddress?: string | undefined;
  };
}

export const orderResolvers: IResolvers = {
  Query: {
    orders: async (
      _root: undefined,
      { filters: { supplier, customerAddress } = {} }: Args,
      { db }: { db: Database }
    ): Promise<Order[]> => {
      let query = {};
      query = supplier !== undefined ? { supplier: new ObjectId(supplier) } : query;
      query = customerAddress !== undefined ? { ...query, customerAddress } : query;
      const orders = await db.orders
        .aggregate([
          { $match: query },
          {
            $lookup: {
              from: 'suppliers',
              localField: 'supplier',
              foreignField: '_id',
              as: 'supplier'
            }
          },
          {
            $unwind: '$supplier'
          },
          {
            $lookup: {
              from: 'items',
              localField: 'items',
              foreignField: '_id',
              as: 'items',
            },
          },
        ])
        .toArray();
      return orders;
    },
    orderedItems: async (
      _root: undefined,
      _args: Args,
      { db }: { db: Database }
    ): Promise<Order[]> => {
      try {
        const items = await db.orders
          .aggregate([
            {
              $lookup: {
                from: 'items',
                localField: 'items',
                foreignField: '_id',
                as: 'items',
              },
            },
            { $unwind: '$items' },
            {
              $group: {
                _id: '$items._id',
                title: { $first: '$items.title' },
                count: { $sum: 1 },
              },
            },
            { $sort: { count: -1 } },
          ])
          .toArray();
        return items;
      } catch (error) {
        throw new Error(`Error parsing query: ${error}`);
      }
    },
  },
  Mutation: {
    deleteOrder: async (
      _root: undefined,
      { _id }: { _id: string },
      { db }: { db: Database }
    ): Promise<Order> => {
      try {
        const { value } = await db.orders.findOneAndDelete({
          _id: new ObjectId(_id),
        });
        if (!value) {
          throw new Error(`No order found to delete`);
        }
        return value;
      } catch (error) {
        throw new Error(`Error deleting order: ${error}`);
      }
    },
  },
};
