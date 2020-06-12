import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { READ_ORDERS } from '../../graphql';
import { makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { OrderData, OrderDataVariables } from '../../lib/types';
import { Header, OrderTable } from '../../lib/components';

interface Props {
  match: {
    params: {
      address: string;
    };
  };
}

const useStyles = makeStyles({
  alert: {
    marginBottom: 10,
  },
});

export const Address = ({ match }: Props) => {
  const classes = useStyles();
  const {
    data: ordersData,
    loading: ordersLoading,
    error: ordersError,
  } = useQuery<OrderData, OrderDataVariables>(READ_ORDERS, {
    variables: {
      filters: { customerAddress: decodeURI(match.params.address) },
    },
  });

  return (
    <Fragment>
      <Header title={decodeURI(match.params.address)} />
      {ordersLoading && <p>Loading Orders...</p>}
      {ordersError && (
        <Alert severity="error" className={classes.alert}>
          Error: {ordersError.message}
        </Alert>
      )}
      {ordersData && (
        <OrderTable
          customerAddress={match.params.address}
          orders={ordersData.orders}
        />
      )}
    </Fragment>
  );
};
