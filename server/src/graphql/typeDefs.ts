import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  input FiltersInput {
    supplier: ID
    customerAddress: String
  }

  type OrderedItems {
    _id: ID
    title: String
    count: Int
  }

  type Item {
    _id: ID!
    title: String!
  }

  type Order {
    _id: ID!
    supplier: Supplier!
    customerAddress: String!
    items: [Item]
  }

  type Supplier {
    _id: ID!
    title: String!
    orders: [Order]
  }

  type Query {
    items: [Item]
    orders(filters: FiltersInput): [Order]
    orderedItems: [OrderedItems]
    supplier(_id:String): Supplier
    suppliers: [Supplier]
  }

  type Mutation {
    deleteOrder(_id: ID!): Order!
  }
`;
