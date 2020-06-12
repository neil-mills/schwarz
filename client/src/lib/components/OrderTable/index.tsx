import React, { Fragment } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { DELETE_ORDER, READ_ORDERS, READ_ORDERED_ITEMS } from '../../../graphql';
import { Item, Order } from '../../types';
import { ExecutionResult, DocumentNode } from 'graphql';
import {
  makeStyles,
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@material-ui/core';

import { Alert } from '@material-ui/lab'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  alert: {
    marginBottom: 10
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

interface DeleteOrderData {
  deleteOrder: Order;
}

interface DeleteOrderVariables {
  _id: string;
}

interface Props {
  orders: Order[];
  supplier?: string;
  customerAddress?: string;
}

interface Filters {
    supplier?: string;
    customerAddress?: string;
}

interface RefetchQuery {
  query: DocumentNode;
  variables?: {
    filters: Filters;
  };
}

export const OrderTable = ({ orders, supplier, customerAddress }: Props) => {
  const [deleteOrder, { loading, error }] = useMutation<
    DeleteOrderData,
    DeleteOrderVariables
  >(DELETE_ORDER);

  const classes = useStyles();

  const filters = Object.entries({ supplier, customerAddress }).reduce((acc, [key, value]) => {
    if (value) acc = { ...acc, [key]: value }
    return acc;
  }, {});

  
  const refetchQuery:RefetchQuery = Object.keys(filters).length ? { query: READ_ORDERS, variables: { filters }} : { query: READ_ORDERS }

  const handleDeleteOrder = (
    id: string
  ): Promise<ExecutionResult<DeleteOrderData>> =>
    deleteOrder({
      variables: { _id: id },
      refetchQueries: [refetchQuery,{query: READ_ORDERED_ITEMS}],
      awaitRefetchQueries: true,
    });

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
          <StyledTableRow key={_id}>
            <TableCell component="th" scope="row">
              <Link to={`/supplier/${supplier._id}`}>{supplier.title}</Link>
            </TableCell>
            <TableCell>{renderItems(items)}</TableCell>
            <TableCell>
              <Link to={`/address/${encodeURI(customerAddress)}`}>
                {customerAddress}
                </Link>
                </TableCell>
            <TableCell align="right">
              <Button
                color="primary"
                variant="contained"
                onClick={() => handleDeleteOrder(_id)}
              >
                Delete
              </Button>
            </TableCell>
          </StyledTableRow>
        ))}
      </Fragment>
    );
  };

  return (
    <Fragment>
      {loading && <p>Deleting order...</p>}
      {error &&
      <Alert className={classes.alert} severity="error">{`Error deleting order: ${error.message}`}</Alert>
      }
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Supplier</StyledTableCell>
            <StyledTableCell>Items</StyledTableCell>
            <StyledTableCell>Customer Address</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderOrders(orders)}</TableBody>
      </Table>
    </TableContainer>
    </Fragment>
  );
};
