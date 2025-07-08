// src/pages/admin/ManageProductsPage.js (Final Version with Edit/Delete)

import React, { useState } from "react"; // Import useState
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
  Avatar,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
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
  green: "#27ae60",
  lightGreen: "rgba(39, 174, 96, 0.1)",
  orange: "#f39c12",
  lightOrange: "rgba(243, 156, 18, 0.1)",
  red: "#c0392b",
  lightRed: "rgba(192, 57, 43, 0.1)",
};

const useStyles = makeStyles((theme) => ({
  // ... (All your existing styles remain the same)
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  pageTitle: { fontWeight: "bold", color: colors.textDark },
  buttonPrimary: {
    backgroundColor: colors.primary,
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "8px",
    "&:hover": { backgroundColor: colors.primaryHover },
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
  productCell: { display: "flex", alignItems: "center" },
  productImage: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
    borderRadius: "8px",
  },
  productName: { fontWeight: 500, color: colors.textDark },
  chip: {
    borderRadius: "16px",
    fontWeight: "bold",
    height: "26px",
    fontSize: "0.8rem",
  },
  statusPublished: { backgroundColor: colors.lightGreen, color: colors.green },
  statusDraft: { backgroundColor: colors.lightOrange, color: colors.orange },
  statusOutOfStock: { backgroundColor: colors.lightRed, color: colors.red },
  filterSelect: {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.primary,
    },
  },
}));

const initialProducts = [
  {
    id: "p1",
    name: "Fresh Chia Seeds",
    price: "250",
    stock: 150,
    category: "Seeds",
    status: "Published",
    imageUrl:
      "https://images.unsplash.com/photo-1507914464521-6d4458f6AA23?w=500&q=80",
  },
  {
    id: "p2",
    name: "Organic Honey",
    price: "450",
    stock: 300,
    category: "Sweeteners",
    status: "Published",
    imageUrl:
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=500&q=80",
  },
  {
    id: "p3",
    name: "Almond Flour",
    price: "600",
    stock: 0,
    category: "Flour",
    status: "Out of Stock",
    imageUrl:
      "https://images.unsplash.com/photo-1621939512674-8c8c739ce34a?w=500&q=80",
  },
  {
    id: "p4",
    name: "Cold-Pressed Coconut Oil",
    price: "350",
    stock: 75,
    category: "Oils",
    status: "Draft",
    imageUrl:
      "https://images.unsplash.com/photo-1590502396323-c73a01a357b2?w=500&q=80",
  },
];

const getStatusChipClass = (status, classes) => {
  switch (status) {
    case "Published":
      return classes.statusPublished;
    case "Draft":
      return classes.statusDraft;
    case "Out of Stock":
      return classes.statusOutOfStock;
    default:
      return "";
  }
};

const ManageProductsPage = () => {
  const classes = useStyles();
  const [products, setProducts] = useState(initialProducts); // Use state to manage products
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Delete function
  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== productId));
      // In a real app, you would also make an API call here to delete from the database
    }
  };

  return (
    <div>
      <Box className={classes.headerContainer}>
        <Typography variant="h4" className={classes.pageTitle}>
          Manage Products
        </Typography>
        <Button
          component={Link}
          to="/admin/products/addedit"
          variant="contained"
          className={classes.buttonPrimary}
          startIcon={<AddIcon />}
        >
          Add Product
        </Button>
      </Box>

      <Card className={classes.contentCard}>
        <Box className={classes.toolbar}>
          <TextField
            style={{ flexGrow: 1 }}
            variant="standard"
            placeholder="Search products..."
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
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              label="Category"
              className={classes.filterSelect}
            >
              <MenuItem value="All">All Categories</MenuItem>
              <MenuItem value="Seeds">Seeds</MenuItem>
              <MenuItem value="Sweeteners">Sweeteners</MenuItem>
              <MenuItem value="Flour">Flour</MenuItem>
              <MenuItem value="Oils">Oils</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className={classes.tableRow}>
                  <TableCell>
                    <Box className={classes.productCell}>
                      <Avatar
                        src={product.imageUrl}
                        variant="rounded"
                        className={classes.productImage}
                      />
                      <Typography
                        variant="body1"
                        className={classes.productName}
                      >
                        {product.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>₹{product.price}</TableCell>
                  <TableCell>
                    {product.stock > 0 ? product.stock : "0"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.status}
                      className={`${classes.chip} ${getStatusChipClass(product.status, classes)}`}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      component={Link}
                      to={`/admin/products/edit/${product.id}`}
                      style={{ color: colors.primary }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      style={{ color: colors.red }}
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default ManageProductsPage;
