import React, { Fragment } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_ORDER } from '../../../graphql';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const classes = useStyles();

import { Item, Order } from '../../types';

export const OrderTable = ({ orders }: { orders: Order[] }) => {

  const [ deleteOrder, { loading, error }] = useMutation(DELETE_ORDER)
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
  );
};
