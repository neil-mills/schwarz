import { gql } from 'apollo-boost';

export const READ_ITEMS = gql`
  query Items {
    items
  }
`;