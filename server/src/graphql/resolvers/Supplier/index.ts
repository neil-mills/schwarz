import { IResolvers } from 'apollo-server-express';
import { Supplier, Database } from '../../../lib/types';
import { ObjectId } from 'mongodb';

export const supplierResolvers: IResolvers = {
  Query: {
    suppliers: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Supplier[]> => {
      try {
        const result = await db.suppliers.find({}).toArray();
        return result;
      } catch (error) {
        throw new Error(`Error with query: ${error}`);
      }
    },
    supplier: async (
      _root: undefined,
      { _id }: { _id: string },
      { db }: { db: Database }
    ): Promise<Supplier | null> => {
      try {
        const supplier = await db.suppliers.findOne({ _id: new ObjectId(_id)});
        return supplier;
      } catch (error) {
        throw new Error(`Error with query: ${error}`);
      }
    },
  },
};
