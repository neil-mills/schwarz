import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { READ_SUPPLIER, READ_ORDERS } from '../../graphql';
import { makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { SupplierData, OrderData, OrderDataVariables } from '../../lib/types';
import { Header, OrderTable } from '../../lib/components';

interface Props {
  match: {
    params: {
      id: string;
    };
  };
}

const useStyles = makeStyles({
  alert: {
    marginBottom: 10,
  },
});

export const Supplier = ({ match }: Props) => {
  const classes = useStyles();

  const { data, loading, error } = useQuery<SupplierData, { _id: string }>(
    READ_SUPPLIER,
    { variables: { _id: match.params.id } }
  );

  const {
    data: ordersData,
    loading: ordersLoading,
    error: ordersError,
  } = useQuery<OrderData, OrderDataVariables>(READ_ORDERS, {
    variables: { filters: { supplier: match.params.id } },
  });

  if (loading || ordersLoading) return <p>Loading Supplier Orders...</p>;
  if (error)
    return (
      <Alert className={classes.alert} severity="error">
        Error fetching supplier: {error.message}
      </Alert>
    );
  if (ordersError)
    return (
      <Alert className={classes.alert} severity="error">
        Error fetching supplier orders: {ordersError.message}
      </Alert>
    );

  return (
    <Fragment>
      {data && ordersData && (
        <Fragment>
          <Header title={data.supplier.title} />
          <OrderTable supplier={match.params.id} orders={ordersData.orders} />
        </Fragment>
      )}
    </Fragment>
  );
};
