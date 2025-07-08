// src/pages/user/WishlistPage.js

import React from "react";
import { useSelector, useDispatch } from "react-redux"; // Redux hooks import karein
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeFromWishList } from "../../store/actions/action"; // Apna action import karein
import { addToCart } from "../../store/actions/action"; // addToCart action bhi import karein

// Theme colors (Koi badlaav nahi)
const colors = {
  primary: "#878fba",
  textDark: "#3d2b56",
  textMuted: "#6c749d",
  cardBg: "#ffffff",
  borderColor: "#e0e0e0",
  red: "#dc3545",
};

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: theme.spacing(3),
  },
  header: {
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: theme.spacing(4),
  },
  productCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
    display: "flex",
    flexDirection: "column",
    height: "100%", // Poori height le
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    },
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  productName: {
    fontWeight: 600,
    color: colors.textDark,
    marginBottom: theme.spacing(0.5),
    fontSize: "1rem",
  },
  productPrice: {
    fontWeight: "bold",
    color: colors.primary,
    fontSize: "1.1rem",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(0, 2, 2, 2),
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    color: "#fff",
    textTransform: "uppercase",
    fontSize: "0.75rem",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#6c749d",
    },
  },
  emptyWishlist: {
    textAlign: "center",
    padding: theme.spacing(10, 2),
    color: colors.textMuted,
  },
}));

const WishlistPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // Redux store se wishlist ka data get karein
  const wishlistItems = useSelector((state) => state.wishList.w_list);

  // Item ko wishlist se hatane ke liye
  const handleRemoveItem = (itemId) => {
    dispatch(removeFromWishList(itemId));
  };

  // Item ko cart mein add karne ke liye
  const handleAddToCart = (item) => {
    dispatch(addToCart(item, 1)); // Assuming quantity is 1
  };

  return (
    <div className={classes.pageContainer}>
      <Typography variant="h4" className={classes.header}>
        My Wishlist ({wishlistItems.length})
      </Typography>

      {wishlistItems.length > 0 ? (
        <Grid container spacing={4}>
          {wishlistItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card className={classes.productCard}>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" className={classes.productName}>
                    {item.title}{" "}
                    {/* Data 'title' field se aa raha hai, 'name' se nahi */}
                  </Typography>
                  <Typography variant="h5" className={classes.productPrice}>
                    ₹{item.price}
                  </Typography>
                </CardContent>
                <Box className={classes.cardActions}>
                  <Button
                    size="small"
                    variant="contained"
                    className={classes.buttonPrimary}
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveItem(item.id)}
                    style={{ color: colors.red }}
                    title="Remove from Wishlist"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card>
          <CardContent className={classes.emptyWishlist}>
            <Typography variant="h6">Your wishlist is empty.</Typography>
            <Typography>
              Looks like you haven't added anything to your wishlist yet.
            </Typography>
            <Button
              component={Link}
              to="/shop"
              variant="contained"
              className={classes.buttonPrimary}
              style={{ marginTop: "24px" }}
            >
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WishlistPage;
