import { gql } from 'apollo-boost';

export const READ_SUPPLIERS = gql`
  query Suppliers {
    suppliers {
      _id
      title
    }
  }
`;

export const READ_SUPPLIER = gql`
  query Supplier($_id:String) {
    supplier(_id: $_id) {
      _id
      title
    }
  }
`;