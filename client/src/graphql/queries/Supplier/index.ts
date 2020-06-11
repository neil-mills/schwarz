import { gql } from 'apollo-boost';

export const READ_SUPPLIERS = gql`
  query Suppliers {
    suppliers {
      _id
      title
    }
  }
`;