import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardContent, Button, Divider } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    header: { marginBottom: theme.spacing(2), fontWeight: 'bold' },
    backButton: { marginBottom: theme.spacing(3) },
    detailSection: { margin: theme.spacing(2, 0) }
}));

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const classes = useStyles();
  
  return (
    <div>
      <Button
        component={Link}
        to="/user/orders"
        color="primary"
        startIcon={<ArrowBackIcon />}
        className={classes.backButton}
      >
        Back to Orders
      </Button>
      <Card>
        <CardContent>
          <Typography variant="h5" className={classes.header}>
            Details for Order #{orderId}
          </Typography>
          <Divider />
          <div className={classes.detailSection}>
            <Typography variant="body1"><strong>Status:</strong> Shipped</Typography>
            <Typography variant="body1"><strong>Total:</strong> $199.99</Typography>
            <Typography variant="body1"><strong>Shipping Address:</strong> 123 React Lane, Component City, 12345</Typography>
          </div>
          <Divider />
          <Typography variant="h6" style={{marginTop: 16}}>Items in this Order:</Typography>
          <ul>
            <li><Typography>Product A (1x) - $99.99</Typography></li>
            <li><Typography>Product B (1x) - $100.00</Typography></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailPage;