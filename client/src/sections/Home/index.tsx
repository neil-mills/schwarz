import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { READ_ORDERS } from '../../graphql';
import { Typography } from '@material-ui/core';

import { OrderData } from '../../lib/types';
import { OrderTable } from '../../lib/components';
export const Home = () => {
  const { data, loading, error } = useQuery<OrderData>(READ_ORDERS);

  return (
    <Fragment>
      <Typography variant="h4" component="h1" gutterBottom>
        Orders
      </Typography>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <OrderTable orders={data.orders} />}
    </Fragment>
  );
};
