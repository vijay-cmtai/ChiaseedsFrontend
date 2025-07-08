// src/pages/user/MyOrdersPage.js (Final Version matching the image)

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Card,
  Chip,
  Box,
  Tabs,
  Tab,
  Divider,
  Avatar,
} from "@material-ui/core";

// --- NEW Color Palette from the image ---
const colors = {
  primary: "#6B5B95", // A purple-blue similar to the image's text
  textDark: "#3d2b56",
  textMuted: "#888888",
  borderColor: "#e9ecef",
  cardBg: "#ffffff",
  // Status colors from the image
  green: "#28a745",
  lightGreen: "#e7f5ee",
  blue: "#17a2b8",
  lightBlue: "#e3f6f8",
};

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: theme.spacing(3),
    backgroundColor: '#f8f9fa', // A very light grey background for the whole page
  },
  header: {
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: theme.spacing(3),
  },
  ordersContainer: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
    padding: theme.spacing(1, 0), // Padding inside the main card
  },
  tabs: {
    borderBottom: `1px solid ${colors.borderColor}`,
    "& .MuiTabs-indicator": {
      backgroundColor: colors.textDark, // The indicator line is dark
    },
  },
  tab: {
    textTransform: "none",
    fontWeight: 600,
    color: colors.textMuted,
    '&.Mui-selected': {
        color: colors.textDark, // Selected tab is dark
    }
  },
  orderCard: {
    padding: theme.spacing(3),
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: colors.textDark,
  },
  orderDate: {
    color: colors.textMuted,
    fontSize: '0.9rem',
  },
  viewDetailsButton: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: '0.8rem'
  },
  productImages: {
    display: "flex",
    gap: theme.spacing(1.5),
    padding: theme.spacing(2, 0),
  },
  productAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    borderRadius: '8px',
    backgroundColor: '#e0e0e0' // Placeholder background color
  },
  orderFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  orderTotal: {
    fontWeight: "bold",
    color: colors.textDark,
  },
  chip: {
    borderRadius: "16px",
    fontWeight: "bold",
    height: "26px",
    fontSize: '0.8rem',
  },
  // Status chip styles from the image
  statusDelivered: { backgroundColor: colors.lightGreen, color: colors.green },
  statusShipped: { backgroundColor: colors.lightBlue, color: colors.blue },
}));

// Dummy data updated to match the image
const orders = [
  { id: "12345", date: "2023-10-26", status: "Shipped", total: "₹1,999", items: [ { name: "Placeholder", imageUrl: "" }, { name: "Organic Honey", imageUrl: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=100" } ]},
  { id: "12346", date: "2023-10-24", status: "Delivered", total: "₹450", items: [ { name: "Placeholder 2", imageUrl: "" } ]},
  { id: "12347", date: "2023-10-22", status: "Processing", total: "₹890", items: [ { name: "Chia Seeds", imageUrl: "https://images.unsplash.com/photo-1507914464521-6d4458f6AA23?w=100" } ]},
];

const getStatusChipClass = (status, classes) => {
  if (status === "Shipped") return classes.statusShipped;
  if (status === "Delivered") return classes.statusDelivered;
  // Fallback for "Processing" or any other status
  return { backgroundColor: '#fff8e1', color: '#f57c00' };
};

const MyOrdersPage = () => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const filteredOrders = useMemo(() => {
    const statusMap = ["All", "Processing", "Shipped", "Delivered"];
    const currentStatus = statusMap[tabIndex];
    if (currentStatus === "All") return orders;
    return orders.filter((order) => order.status === currentStatus);
  }, [tabIndex]);

  return (
    <div className={classes.pageContainer}>
      <Typography variant="h4" className={classes.header}>
        My Orders
      </Typography>

      <Card className={classes.ordersContainer}>
        <Tabs value={tabIndex} onChange={handleTabChange} className={classes.tabs}>
          <Tab label="All" className={classes.tab} />
          <Tab label="Processing" className={classes.tab} />
          <Tab label="Shipped" className={classes.tab} />
          <Tab label="Delivered" className={classes.tab} />
        </Tabs>

        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <React.Fragment key={order.id}>
              <Box className={classes.orderCard}>
                <Box className={classes.orderHeader}>
                  <Box>
                    <Typography variant="h6" className={classes.orderId}>Order #{order.id}</Typography>
                    <Typography variant="body2" className={classes.orderDate}>Ordered on: {order.date}</Typography>
                  </Box>
                  <Button component={Link} to={`/user/orders/${order.id}`} className={classes.viewDetailsButton}>
                    VIEW DETAILS
                  </Button>
                </Box>
                <Box className={classes.productImages}>
                  {order.items.map((item, idx) => (
                    <Avatar key={idx} src={item.imageUrl} variant="rounded" className={classes.productAvatar}>
                        {/* Fallback icon if image is missing */}
                        <i className="fa fa-user" style={{color: '#fff'}}></i>
                    </Avatar>
                  ))}
                </Box>
                <Box className={classes.orderFooter}>
                  <Typography variant="body1" className={classes.orderTotal}>Total: {order.total}</Typography>
                  <Chip
                    label={order.status}
                    className={`${classes.chip} ${getStatusChipClass(order.status, classes)}`}
                  />
                </Box>
              </Box>
              {index < filteredOrders.length - 1 && <Divider />}
            </React.Fragment>
          ))
        ) : (
          <Typography align="center" color="textSecondary" style={{ padding: "40px" }}>
            You have no orders in this category.
          </Typography>
        )}
      </Card>
    </div>
  );
};

export default MyOrdersPage;