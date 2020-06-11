import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ObjectId } from 'mongodb';
import { READ_ORDERS } from '../../graphql';

import { OrderData, Item, Order } from '../../lib/types';

export const Home = () => {
  const { data, loading, error } = useQuery<OrderData>(READ_ORDERS);
  

  const renderItems = (items: Item[]) => (
    <p>
      {items.map(({ _id, title }: Item) => (
        <span key={_id}>{title}</span>
      ))}
    </p>
  );

  const renderOrders = (orders: Order[]) => {
    return (
      <Fragment>
        {orders.map(({ _id, supplier, items, customerAddress }: Order) => (
          <TableRow key={_id}>
            <TableCell component="th" scope="row">
              {supplier.title}
            </TableCell>
            <TableCell>{renderItems(items)}</TableCell>
            <TableCell>{customerAddress}</TableCell>
            <TableCell>
              <Button onClick={() => console.log('clicked')}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </Fragment>
    );
  };
  return (
    <Fragment>
      <h2>Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Supplier</TableCell>
                <TableCell>Customer Address</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderOrders(data.orders)}</TableBody>
          </Table>
        </TableContainer>
      )}
    </Fragment>
  );
};
