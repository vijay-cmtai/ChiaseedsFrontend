// src/pages/admin/AdminDashboardPage.js (Final Version with Vibrant Theme)

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Chip,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import AddIcon from "@material-ui/icons/Add";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// --- UPDATED "Vibrant Gradient" Color Theme ---
const colors = {
  primary: "#878fba",
  primaryHover: "#6c749d",
  textDark: "#3d2b56",
  textMuted: "#6c749d",
  cardBg: "#ffffff",
  // New vibrant colors for stats
  statPurple: "#8854d0",
  statTeal: "#0fb9b1",
  statAmber: "#f7b731",
  statusCompleted: "#20bf6b",
  statusPending: "#fa8231",
};

const useStyles = makeStyles((theme) => ({
  welcomeHeader: {
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: theme.spacing(4),
  },
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
  statValue: {
    fontWeight: "bold",
    color: colors.textDark,
    lineHeight: 1.2,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: "0.9rem",
  },
  bottomCard: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
  },
  chartContainer: {
    height: "350px",
  },
  sectionTitle: {
    fontWeight: 600,
    color: colors.textDark,
    marginBottom: theme.spacing(2),
  },
  quickActionsContainer: {
    marginTop: theme.spacing(4),
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: colors.primaryHover,
    },
  },
  buttonSecondary: {
    color: colors.primary,
    borderColor: colors.primary,
    fontWeight: "bold",
    borderRadius: "8px",
  },
  statusChip: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "#fff",
  },
}));

// Dummy data
const salesData = [
  { name: "Jan", Sales: 4000 },
  { name: "Feb", Sales: 3000 },
  { name: "Mar", Sales: 5000 },
  { name: "Apr", Sales: 4500 },
  { name: "May", Sales: 6000 },
  { name: "Jun", Sales: 5500 },
];
const recentOrdersData = [
  { id: "#1234", user: "Amit Kumar", amount: "₹4,500", status: "Completed" },
  { id: "#1235", user: "Priya Sharma", amount: "₹1,200", status: "Pending" },
  { id: "#1236", user: "Rahul Verma", amount: "₹8,900", status: "Completed" },
];

const AdminDashboardPage = () => {
  const classes = useStyles();

  const stats = [
    {
      label: "Total Sales",
      value: "₹1,45,000",
      icon: <MonetizationOnIcon />,
      color: colors.statPurple,
    },
    {
      label: "New Orders",
      value: "32",
      icon: <ShoppingCartIcon />,
      color: colors.statTeal,
    },
    {
      label: "Active Users",
      value: "1,204",
      icon: <PeopleIcon />,
      color: colors.statAmber,
    },
  ];

  return (
    <div>
      <Typography variant="h4" className={classes.welcomeHeader}>
        Welcome back, Admin!
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
                <Typography variant="h5" className={classes.statValue}>
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
        <Grid item xs={12} lg={8}>
          <Card className={classes.bottomCard}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Monthly Sales Overview
            </Typography>
            <div className={classes.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={salesData}
                  margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Sales"
                    stroke={colors.primary}
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card className={classes.bottomCard}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Recent Orders
            </Typography>
            <List>
              {recentOrdersData.map((order) => (
                <ListItem key={order.id} divider>
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: colors.primary }}>
                      {order.user.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={order.user}
                    secondary={`Order ${order.id} - ${order.amount}`}
                  />
                  <Chip
                    label={order.status}
                    size="small"
                    className={classes.statusChip}
                    style={{
                      backgroundColor:
                        order.status === "Completed"
                          ? colors.statusCompleted
                          : colors.statusPending,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>

      <Box className={classes.quickActionsContainer}>
        <Typography variant="h6" className={classes.sectionTitle}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              component={Link}
              to="/admin/products/add"
              variant="contained"
              className={classes.buttonPrimary}
              startIcon={<AddIcon />}
            >
              Add New Product
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to="/admin/orders"
              variant="outlined"
              className={classes.buttonSecondary}
            >
              View All Orders
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AdminDashboardPage;
