import React from 'react';
import { Grid, Button, ButtonGroup, Typography, makeStyles } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const useStyles = makeStyles({
  header: {
    marginBottom: 20,
  },
});

interface IProps extends RouteComponentProps {
  title: string;
}

const HeaderComponent: React.FC<IProps> = ({ title, history, location }) => {
  const classes = useStyles();

  const handleClick = (path = "/") => {
    history.push(path);
  };
  return (
    <Grid
      className={classes.header}
      container
      component="header"
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      {' '}
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        {location.pathname !== '/item' &&
        <Button onClick={() => handleClick('/item')}>Items Ordered</Button>
        }
      {location.pathname !== '/' && (
        <Button  onClick={() => handleClick()}>
          Back to Orders
        </Button>
      )}

      </ButtonGroup>
    </Grid>
  );
};

export const Header = withRouter<IProps, any>(HeaderComponent);
