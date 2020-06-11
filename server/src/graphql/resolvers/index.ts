import merge from 'lodash.merge';
import { itemResolvers } from './Item';
import { supplierResolvers } from './Supplier';
import { orderResolvers } from './Order';


export const resolvers = merge(itemResolvers, supplierResolvers, orderResolvers);