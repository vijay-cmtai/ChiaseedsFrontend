// src/pages/user/UserDashboardPage.js (Corrected Code)

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  // CardContent, // <--- REMOVED
  Typography,
  Box,
  // Button, // <--- REMOVED
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

// ... (Theme colors and useStyles remain the same) ...
const colors = {
  primary: "#878fba",
  secondary: "#3d2b56",
  textDark: "#3d2b56",
  textMuted: "#6c749d",
  cardBg: "#ffffff",
  green: "#28a745",
  lightGreen: "#e7f5ee",
  orange: "#fd7e14",
  lightOrange: "#fef2e7",
};
const useStyles = makeStyles((theme) => ({
  pageContainer: { padding: theme.spacing(3) },
  welcomeHeader: {
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: theme.spacing(1),
  },
  welcomeSubheader: { color: colors.textMuted, marginBottom: theme.spacing(4) },
  statCard: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(3),
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
    height: "100%",
  },
  iconContainer: {
    padding: theme.spacing(2),
    borderRadius: "50%",
    marginRight: theme.spacing(3),
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: { fontWeight: "bold", color: colors.textDark },
  statLabel: { color: colors.textMuted, fontSize: "0.9rem" },
  contentCard: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(1),
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
  },
  sectionTitle: {
    fontWeight: 600,
    color: colors.textDark,
    padding: theme.spacing(2, 2, 1, 2),
  },
  quickLinkButton: {
    justifyContent: "space-between",
    padding: theme.spacing(1.5, 2),
    textTransform: "none",
    color: colors.textDark,
  },
  chip: { borderRadius: "16px", fontWeight: "bold", height: "26px" },
  statusDelivered: { backgroundColor: colors.lightGreen, color: colors.green },
  statusPending: { backgroundColor: colors.lightOrange, color: colors.orange },
}));

const stats = [
  // ... (dummy data remains the same) ...
  {
    label: "Pending Orders",
    value: "5",
    icon: <ShoppingBasketIcon />,
    color: "#fd7e14",
  },
  {
    label: "Wishlist Items",
    value: "12",
    icon: <FavoriteIcon />,
    color: "#dc3545",
  },
  {
    label: "Saved Addresses",
    value: "3",
    icon: <LocationOnIcon />,
    color: "#17a2b8",
  },
];

const recentOrders = [
  // ... (dummy data remains the same) ...
  {
    id: "#ORD-12349",
    date: "Oct 23, 2023",
    total: "₹1,550",
    status: "Delivered",
  },
  { id: "#ORD-12347", date: "Oct 25, 2023", total: "₹890", status: "Pending" },
];

const getStatusChipClass = (status, classes) => {
  return status === "Delivered"
    ? classes.statusDelivered
    : classes.statusPending;
};

const UserDashboardPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.pageContainer}>
      <Typography variant="h4" className={classes.welcomeHeader}>
        Hello, John Doe!
      </Typography>
      <Typography variant="body1" className={classes.welcomeSubheader}>
        Here's a quick overview of your account.
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat.label}>
            <Card className={classes.statCard}>
              <Box
                className={classes.iconContainer}
                style={{ backgroundColor: stat.color }}
              >
                {stat.icon}
              </Box>
              <Box>
                <Typography variant="h4" className={classes.statValue}>
                  {stat.value}
                </Typography>
                <Typography variant="body1" className={classes.statLabel}>
                  {stat.label}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card className={classes.contentCard}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Recent Orders
            </Typography>
            <List>
              {recentOrders.map((order, index) => (
                <React.Fragment key={order.id}>
                  <ListItem>
                    <ListItemText
                      primary={`Order ${order.id}`}
                      secondary={`Date: ${order.date} | Total: ${order.total}`}
                    />
                    <Chip
                      label={order.status}
                      className={`${classes.chip} ${getStatusChipClass(order.status, classes)}`}
                    />
                  </ListItem>
                  {index < recentOrders.length - 1 && (
                    <Divider variant="middle" component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className={classes.contentCard}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Quick Links
            </Typography>
            <List>
              <ListItem
                button
                component={Link}
                to="/user/orders"
                className={classes.quickLinkButton}
              >
                <ListItemText primary="View All My Orders" />
                <ArrowForwardIcon fontSize="small" />
              </ListItem>
              <Divider variant="middle" />
              <ListItem
                button
                component={Link}
                to="/user/profile"
                className={classes.quickLinkButton}
              >
                <ListItemText primary="Edit Your Profile" />
                <ArrowForwardIcon fontSize="small" />
              </ListItem>
              <Divider variant="middle" />
              <ListItem
                button
                component={Link}
                to="/user/address"
                className={classes.quickLinkButton}
              >
                <ListItemText primary="Manage Addresses" />
                <ArrowForwardIcon fontSize="small" />
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserDashboardPage;
