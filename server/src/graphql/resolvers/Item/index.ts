import { IResolvers } from 'apollo-server-express';
import { Item, Database } from '../../../lib/types';


export const itemResolvers: IResolvers = {
  Query: {
    items: async (_root: undefined, _args: {}, { db }: { db: Database }):Promise<Item[]> => {
      try {
        const items = await db.items.find({}).toArray();
        return items;
      } catch (error) { 
        throw new Error(`Error parsing query: ${error}`)
      }
    }
  }
}