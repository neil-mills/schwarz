import { gql } from 'apollo-boost';

export const READ_ORDERS = gql`
  query Orders($filters: FiltersInput) {
    orders(filters: $filters) {
      _id
      supplier {
        _id
        title
      }
      items {
        _id
        title
      }
      customerAddress
    }
  }
`;

export const READ_ORDERED_ITEMS = gql`
  query OrderedItems {
    orderedItems {
      _id
      title
      count
    }
  }
`;