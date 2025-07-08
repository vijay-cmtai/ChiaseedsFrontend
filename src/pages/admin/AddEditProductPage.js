import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Box,
  IconButton,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

// Aapke naye theme se milte-julte colors
const colors = {
  primary: "#878fba",
  textDark: "#3d2b56",
  textMuted: "#6c749d",
  borderColor: "#e0e0e0",
  lightBg: "#f8f9fa",
};

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: theme.spacing(3),
  },
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
  formCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    padding: theme.spacing(2),
  },
  sectionTitle: {
    fontWeight: 600,
    color: colors.textDark,
    marginBottom: theme.spacing(3),
    borderBottom: `2px solid ${colors.borderColor}`,
    paddingBottom: theme.spacing(1),
  },
  imageUploader: {
    border: `2px dashed ${colors.borderColor}`,
    borderRadius: "8px",
    padding: theme.spacing(4),
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: colors.lightBg,
    color: colors.textMuted,
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#f1f3f5",
    },
  },
  imagePreview: {
    width: "100%",
    height: "auto",
    maxHeight: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginTop: theme.spacing(2),
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    color: "#fff",
    fontWeight: "bold",
    padding: theme.spacing(1.5, 4),
    "&:hover": {
      backgroundColor: "#6c749d",
    },
  },
}));

const AddEditProductPage = () => {
  const classes = useStyles();
  const { productId } = useParams();
  const isEditing = Boolean(productId);

  // Image preview ke liye state
  const [productImage, setProductImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className={classes.pageContainer}>
      <Box className={classes.headerContainer}>
        <Typography variant="h4" className={classes.pageTitle}>
          {isEditing ? "Edit Product" : "Add New Product"}
        </Typography>
        <Button
          component={Link}
          to="/admin/products"
          color="primary"
          startIcon={<ArrowBackIcon />}
        >
          Back to Products
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column: Product Details Form */}
        <Grid item xs={12} md={8}>
          <Card className={classes.formCard}>
            <CardContent>
              <Typography variant="h6" className={classes.sectionTitle}>
                Product Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Product Name"
                    variant="outlined"
                    defaultValue={isEditing ? "Smart Watch Pro" : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price (₹)"
                    type="number"
                    variant="outlined"
                    defaultValue={isEditing ? "19999" : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Stock Quantity"
                    type="number"
                    variant="outlined"
                    defaultValue={isEditing ? "150" : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Product Description"
                    variant="outlined"
                    multiline
                    rows={6}
                    placeholder="Describe the product details, features, and benefits..."
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column: Image Uploader */}
        <Grid item xs={12} md={4}>
          <Card className={classes.formCard}>
            <CardContent>
              <Typography variant="h6" className={classes.sectionTitle}>
                Product Image
              </Typography>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="product-image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="product-image-upload">
                <Box className={classes.imageUploader}>
                  <IconButton color="primary" component="span">
                    <PhotoCamera style={{ fontSize: 40 }} />
                  </IconButton>
                  <Typography>Click to upload image</Typography>
                </Box>
              </label>
              {imagePreviewUrl && (
                <Box mt={2}>
                  <Typography variant="subtitle2">Image Preview:</Typography>
                  <img
                    src={imagePreviewUrl}
                    alt="Preview"
                    className={classes.imagePreview}
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Save Button */}
      <Box mt={4} style={{ textAlign: "right" }}>
        <Button variant="contained" className={classes.buttonPrimary}>
          {isEditing ? "Save Changes" : "Create Product"}
        </Button>
      </Box>
    </div>
  );
};

export default AddEditProductPage;
