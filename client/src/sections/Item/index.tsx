import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Header } from '../../lib/components';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { READ_ORDERED_ITEMS } from '../../graphql';
import { OrderedItemsData } from '../../lib/types';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  alert: {
    marginBottom: 10,
  },
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

export const Item: React.FC = () => {
  const { data, loading, error } = useQuery<OrderedItemsData>(
    READ_ORDERED_ITEMS
  );

  const classes = useStyles();

  const renderItems = () => {
    return (
      <Fragment>
        {data &&
          data.orderedItems.map(
            ({
              _id,
              title,
              count,
            }: {
              _id: string;
              title: string;
              count: number;
            }) => (
              <StyledTableRow key={_id}>
                <TableCell component="th" scope="row">
                  {title}
                </TableCell>
                <TableCell>{count}</TableCell>
              </StyledTableRow>
            )
          )}
      </Fragment>
    );
  };
  return (
    <Fragment>
      <Header title="Items Ordered" />
      {loading && <p>Loading items...</p>}
      {error && (
        <Alert
          className={classes.alert}
          severity="error"
        >{`Error loading items: ${error.message}`}</Alert>
      )}

      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Item</StyledTableCell>
              <StyledTableCell align="right">Total Sales</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderItems()}</TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};
