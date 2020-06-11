import { gql } from 'apollo-boost';

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id:ID!) {
    deleteOrder(_id: $id) {
      _id
    }
  }
`;