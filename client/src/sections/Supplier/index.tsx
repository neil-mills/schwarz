import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { READ_ORDERS, READ_SUPPLIER } from '../../graphql';
import { Typography } from '@material-ui/core';

import { OrderData, OrderDataVariables, SupplierData } from '../../lib/types';
import { OrderTable } from '../../lib/components';

interface Props {
  match: {
    params: {
      id: string;
    };
  };
}

export const Supplier = ({ match }: Props) => {
  const { data, loading, error } = useQuery<SupplierData, { _id: string }>(
    READ_SUPPLIER,
    { variables: { _id: match.params.id } }
  );
  const { data: ordersData, loading: ordersLoading, error: ordersError } = useQuery<OrderData, OrderDataVariables>(
    READ_ORDERS,
    { variables: { filters: { supplier: match.params.id } } }
  );

  return (
    <Fragment>
      {!loading && data &&
      <Typography variant="h4" component="h1" gutterBottom>
        {data.supplier.title}
      </Typography>      
      }
      {ordersLoading && <p>Loading Orders...</p>}
      {ordersError && <p>Error: {ordersError.message}</p>}
      {ordersData && <OrderTable supplier={match.params.id} orders={ordersData.orders} />}
    </Fragment>
  );
};
