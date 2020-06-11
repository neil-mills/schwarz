import { gql } from 'apollo-boost';

export const DELETE_ORDER = gql`
  mutation DeleteOrder($_id:ID!) {
    deleteOrder(_id: $_id) {
      _id
    }
  }
`;