import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { READ_ORDERS, READ_SUPPLIER } from '../../graphql';
import { Typography } from '@material-ui/core';

import { OrderData, OrderDataVariables } from '../../lib/types';
import { OrderTable } from '../../lib/components';

interface Props {
  match: {
    params: {
      address: string
    };
  };
}

export const Address = ({ match }: Props) => {
 
  const { data: ordersData, loading: ordersLoading, error: ordersError } = useQuery<OrderData, OrderDataVariables>(
    READ_ORDERS,
    { variables: { filters: { customerAddress: decodeURI(match.params.address) } } }
  );

  return (
    <Fragment>
      <Typography variant="h4" component="h1" gutterBottom>
       {decodeURI(match.params.address)}
      </Typography>      
      {ordersLoading && <p>Loading Orders...</p>}
      {ordersError && <p>Error: {ordersError.message}</p>}
      {ordersData && <OrderTable customerAddress={match.params.address} orders={ordersData.orders} />}
    </Fragment>
  );
};
