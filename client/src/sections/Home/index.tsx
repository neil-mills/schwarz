import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { READ_ORDERS } from '../../graphql';

import { OrderData } from '../../lib/types';
import { Header, OrderTable } from '../../lib/components';
export const Home = () => {
  const { data, loading, error } = useQuery<OrderData>(READ_ORDERS);

  return (
    <Fragment>
      <Header title={'Orders'} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <OrderTable orders={data.orders} />}
    </Fragment>
  );
};
