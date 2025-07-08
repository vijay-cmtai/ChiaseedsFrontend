// src/pages/admin/ManageOrdersPage.js (Complete, Final Code with View Dialog)

import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Card,
  Box,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  // Dialog imports for the popup
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SearchIcon from "@material-ui/icons/Search";

// --- "Earthy & Trustworthy" Color Theme ---
const colors = {
  primary: "#a96e4f",
  primaryHover: "#8e5a3e",
  textDark: "#2c3e50",
  textMuted: "#667280",
  cardBg: "#ffffff",
  borderColor: "#e0e0e0",
  lightBg: "#f9f7f3",
  // Status colors
  green: "#27ae60",
  lightGreen: "rgba(39, 174, 96, 0.1)",
  blue: "#3498db",
  lightBlue: "rgba(52, 152, 219, 0.1)",
  orange: "#f39c12",
  lightOrange: "rgba(243, 156, 18, 0.1)",
  grey: "#95a5a6",
  lightGrey: "rgba(149, 165, 166, 0.1)",
};

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  pageTitle: {
    fontWeight: "bold",
    color: colors.textDark,
  },
  buttonSecondary: {
    color: colors.primary,
    borderColor: colors.primary,
    fontWeight: "bold",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "rgba(169, 110, 79, 0.05)",
      borderColor: colors.primary,
    },
  },
  contentCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
  },
  toolbar: {
    padding: theme.spacing(2, 3),
    display: "flex",
    gap: theme.spacing(2),
    alignItems: "center",
    borderBottom: `1px solid ${colors.borderColor}`,
  },
  tableHead: {
    backgroundColor: colors.lightBg,
    "& .MuiTableCell-head": {
      fontWeight: "bold",
      color: colors.textDark,
      borderBottom: "none",
    },
  },
  tableRow: {
    "& .MuiTableCell-root": { borderBottom: `1px solid ${colors.borderColor}` },
    "&:last-child .MuiTableCell-root": { borderBottom: "none" },
    "&:hover": { backgroundColor: colors.lightBg },
  },
  orderId: {
    fontWeight: 500,
    color: colors.primary,
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": { textDecoration: "underline" },
  },
  chip: {
    borderRadius: "16px",
    fontWeight: "bold",
    height: "26px",
    fontSize: "0.8rem",
  },
  statusDelivered: { backgroundColor: colors.lightGreen, color: colors.green },
  statusShipped: { backgroundColor: colors.lightBlue, color: colors.blue },
  statusPending: { backgroundColor: colors.lightOrange, color: colors.orange },
  statusCancelled: { backgroundColor: colors.lightGrey, color: colors.grey },
  filterSelect: {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.primary,
    },
  },
  dialogTitle: { color: colors.textDark, fontWeight: "bold" },
}));

// Dummy data for orders with more details
const orders = [
  {
    id: "#ORD-12345",
    customerName: "John Doe",
    date: "2023-10-26",
    total: "₹2,500",
    status: "Delivered",
    items: [{ name: "Chia Seeds", qty: 2, price: 1250 }],
    address: "123 Health St, Mumbai",
  },
  {
    id: "#ORD-12346",
    customerName: "Jane Smith",
    date: "2023-10-25",
    total: "₹1,200",
    status: "Shipped",
    items: [{ name: "Organic Honey", qty: 1, price: 1200 }],
    address: "456 Wellness Ave, Delhi",
  },
  {
    id: "#ORD-12347",
    customerName: "Admin User",
    date: "2023-10-25",
    total: "₹890",
    status: "Pending",
    items: [{ name: "Almond Flour", qty: 1, price: 890 }],
    address: "789 Fitness Rd, Bangalore",
  },
];

const getStatusChipClass = (status, classes) => {
  switch (status) {
    case "Delivered":
      return classes.statusDelivered;
    case "Shipped":
      return classes.statusShipped;
    case "Pending":
      return classes.statusPending;
    case "Cancelled":
      return classes.statusCancelled;
    default:
      return "";
  }
};

const ManageOrdersPage = () => {
  const classes = useStyles();
  const [statusFilter, setStatusFilter] = React.useState("All");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewingOrder, setViewingOrder] = useState(null);

  const handleOpenViewDialog = (order) => {
    setViewingOrder(order);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setViewingOrder(null);
  };

  return (
    <div>
      {/* Page Header */}
      <Box className={classes.headerContainer}>
        <Typography variant="h4" className={classes.pageTitle}>
          Manage Orders
        </Typography>
        <Button variant="outlined" className={classes.buttonSecondary}>
          Export Orders
        </Button>
      </Box>

      {/* Main Content Card with Table */}
      <Card className={classes.contentCard}>
        {/* Toolbar */}
        <Box className={classes.toolbar}>
          <TextField
            style={{ flexGrow: 1 }}
            variant="standard"
            placeholder="Search by Order ID or Customer..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
          />
          <FormControl
            variant="outlined"
            size="small"
            style={{ minWidth: 150 }}
          >
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
              className={classes.filterSelect}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Orders Table */}
        <TableContainer>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className={classes.tableRow}>
                  <TableCell>
                    <Typography
                      onClick={() => handleOpenViewDialog(order)}
                      variant="body1"
                      className={classes.orderId}
                    >
                      {order.id}
                    </Typography>
                  </TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      className={`${classes.chip} ${getStatusChipClass(order.status, classes)}`}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenViewDialog(order)}
                      style={{ color: colors.primary }}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* VIEW ORDER DETAILS DIALOG (POPUP) */}
      {viewingOrder && (
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            <Typography className={classes.dialogTitle}>
              Order Details: {viewingOrder.id}
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="textSecondary">Customer:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <strong>{viewingOrder.customerName}</strong>
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography color="textSecondary">Order Date:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <strong>{viewingOrder.date}</strong>
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography color="textSecondary">Status:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Chip
                  label={viewingOrder.status}
                  size="small"
                  className={`${classes.chip} ${getStatusChipClass(viewingOrder.status, classes)}`}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider style={{ margin: "16px 0" }} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" className={classes.dialogTitle}>
                  Items
                </Typography>
              </Grid>
              {viewingOrder.items.map((item) => (
                <Fragment key={item.name}>
                  <Grid item xs={8}>
                    <Typography>
                      {item.name} (Qty: {item.qty})
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography align="right">
                      <strong>₹{item.price * item.qty}</strong>
                    </Typography>
                  </Grid>
                </Fragment>
              ))}

              <Grid item xs={12}>
                <Divider style={{ margin: "16px 0" }} />
              </Grid>

              <Grid item xs={8}>
                <Typography variant="h6">
                  <strong>Total</strong>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6" align="right">
                  <strong>{viewingOrder.total}</strong>
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              style={{ color: colors.primary }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ManageOrdersPage;
