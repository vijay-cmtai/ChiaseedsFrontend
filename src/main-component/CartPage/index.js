// src/pages/CartPage/index.js (or your path)

import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Grid,
  Card,
  Avatar,
  Box,
  IconButton,
  Divider,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/pagetitle";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import { totalPrice } from "../../utils";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../store/actions/action";

// --- ORIGINAL "Vibrant Gradient" Color Theme ---
const colors = {
  primary: "#878fba",
  primaryHover: "#6c749d",
  textDark: "#3d2b56",
  textMuted: "#6c749d",
  cardBg: "#ffffff",
  borderColor: "rgba(61, 43, 86, 0.1)",
  red: "#e64444",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
};

const useStyles = makeStyles((theme) => ({
  pageWrapper: {
    background: `linear-gradient(to bottom, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
    padding: "80px 0",
  },
  cartItemCard: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    borderRadius: "12px",
    boxShadow: `0 4px 20px ${colors.borderColor}`,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly transparent card
    marginBottom: theme.spacing(2),
  },
  productImage: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginRight: theme.spacing(3),
    borderRadius: "8px",
  },
  productInfo: {
    flexGrow: 1,
  },
  productTitle: {
    fontWeight: 600,
    color: colors.textDark,
    fontSize: "1.1rem",
  },
  quantitySelector: {
    display: "flex",
    alignItems: "center",
    border: `1px solid ${colors.borderColor}`,
    borderRadius: "8px",
  },
  quantityText: {
    padding: theme.spacing(0, 2),
    fontWeight: "bold",
    color: colors.textDark,
  },
  summaryCard: {
    padding: theme.spacing(3),
    borderRadius: "12px",
    backgroundColor: colors.cardBg,
    boxShadow: `0 4px 20px ${colors.borderColor}`,
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1.5),
    color: colors.textMuted,
  },
  summaryTotal: {
    color: colors.textDark,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    color: "#fff",
    fontWeight: "bold",
    padding: "12px 0",
    borderRadius: "8px",
    marginTop: theme.spacing(2),
    "&:hover": {
      backgroundColor: colors.primaryHover,
    },
  },
  emptyCart: {
    textAlign: "center",
    padding: theme.spacing(10, 2),
    color: colors.textMuted,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "15px",
    boxShadow: `0 5px 25px ${colors.borderColor}`,
  },
}));

const CartPage = (props) => {
  const classes = useStyles();
  const { carts, removeFromCart, incrementQuantity, decrementQuantity } = props;

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <Fragment>
      <Navbar hClass={"header-style-2"} />
      <PageTitle pageTitle={"Shopping Cart"} pagesub={"Cart"} />

      <div className={classes.pageWrapper}>
        <div className="container">
          {carts && carts.length > 0 ? (
            <Grid container spacing={4}>
              {/* Left Column: Cart Items */}
              <Grid item xs={12} lg={8}>
                {carts.map((catItem) => (
                  <Card key={catItem.id} className={classes.cartItemCard}>
                    <Avatar
                      src={catItem.proImg}
                      variant="rounded"
                      className={classes.productImage}
                    />
                    <Box className={classes.productInfo}>
                      <Typography className={classes.productTitle}>
                        {catItem.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{ color: colors.textMuted }}
                      >
                        Price: ₹{catItem.price}
                      </Typography>
                    </Box>
                    <Box className={classes.quantitySelector}>
                      <IconButton
                        size="small"
                        onClick={() => decrementQuantity(catItem.id)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography className={classes.quantityText}>
                        {catItem.qty}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => incrementQuantity(catItem.id)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Typography
                      style={{
                        fontWeight: "bold",
                        minWidth: "80px",
                        textAlign: "right",
                        marginLeft: "24px",
                        color: colors.textDark,
                      }}
                    >
                      ₹{catItem.qty * catItem.price}
                    </Typography>
                    <IconButton
                      style={{ color: colors.red, marginLeft: "16px" }}
                      onClick={() => removeFromCart(catItem.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Card>
                ))}
              </Grid>

              {/* Right Column: Order Summary */}
              <Grid item xs={12} lg={4}>
                <div className={classes.summaryCard}>
                  <Typography
                    variant="h5"
                    style={{
                      color: colors.textDark,
                      fontWeight: "bold",
                      marginBottom: "24px",
                    }}
                  >
                    Order Summary
                  </Typography>
                  <Box className={classes.summaryRow}>
                    <Typography>Subtotal ({carts.length} items)</Typography>
                    <Typography style={{ fontWeight: 500 }}>
                      ₹{totalPrice(carts)}
                    </Typography>
                  </Box>
                  <Box className={classes.summaryRow}>
                    <Typography>Shipping</Typography>
                    <Typography style={{ fontWeight: 500, color: "green" }}>
                      FREE
                    </Typography>
                  </Box>
                  <Divider style={{ margin: "16px 0" }} />
                  <Box className={classes.summaryRow}>
                    <Typography variant="h6" className={classes.summaryTotal}>
                      Total
                    </Typography>
                    <Typography variant="h6" className={classes.summaryTotal}>
                      ₹{totalPrice(carts)}
                    </Typography>
                  </Box>
                  <Button
                    fullWidth
                    component={Link}
                    to="/checkout"
                    onClick={ClickHandler}
                    className={classes.checkoutButton}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </Grid>
            </Grid>
          ) : (
            <div className={classes.emptyCart}>
              <Typography variant="h5" style={{ color: colors.textDark }}>
                Your Shopping Cart is Empty
              </Typography>
              <Typography style={{ marginTop: "10px", marginBottom: "30px" }}>
                Add products to your cart to see them here.
              </Typography>
              <Button
                component={Link}
                to="/shop"
                variant="contained"
                className={classes.checkoutButton}
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    carts: state.cartList.cart,
  };
};

export default connect(mapStateToProps, {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
})(CartPage);
