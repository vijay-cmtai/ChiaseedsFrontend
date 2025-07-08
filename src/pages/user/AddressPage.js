// src/pages/user/AddressPage.js

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  IconButton,
  Chip,
  Divider,
  Modal,
  TextField,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";

// Theme colors
const colors = {
  primary: "#878fba",
  textDark: "#3d2b56",
  textMuted: "#6c749d",
  borderColor: "#e0e0e0",
  lightBg: "#f8f9fa",
  cardBg: "#ffffff",
};

const useStyles = makeStyles((theme) => ({
  pageContainer: { padding: theme.spacing(3) },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  pageTitle: { fontWeight: "bold", color: colors.textDark },
  // [FIX] Card size ke liye height: '100%' hata diya gaya hai
  addressCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
  },
  defaultCard: { border: `2px solid ${colors.primary}` },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: theme.spacing(1.5),
  },
  addressType: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    fontWeight: 600,
    color: colors.textDark,
  },
  cardContent: { flexGrow: 1 },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: theme.spacing(1),
  },
  defaultChip: {
    backgroundColor: colors.primary,
    color: "white",
    fontWeight: "bold",
    fontSize: "0.7rem",
    height: "22px",
  },
  addAddressCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    border: `2px dashed ${colors.borderColor}`,
    cursor: "pointer",
    transition: "all 0.3s ease",
    minHeight: "220px",
    "&:hover": { borderColor: colors.primary, backgroundColor: colors.lightBg },
  },
  modal: { display: "flex", alignItems: "center", justifyContent: "center" },
  modalPaper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "12px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    color: "#fff",
    "&:hover": { backgroundColor: "#6c749d" },
  },
}));

const initialAddresses = [
  {
    id: 1,
    type: "Home",
    default: true,
    name: "John Doe",
    addressLine1: "123 React Lane, App-artment 4B",
    cityStateZip: "Component City, 12345",
    phone: "(123) 456-7890",
  },
  {
    id: 2,
    type: "Work",
    default: false,
    name: "John Doe",
    addressLine1: "456 Material-UI Drive, Suite 200",
    cityStateZip: "Styling Town, 54321",
    phone: "(987) 654-3210",
  },
];

const AddressPage = () => {
  const classes = useStyles();
  const [addresses, setAddresses] = useState(initialAddresses);
  const [openModal, setOpenModal] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  const handleOpenModal = (address = null) => {
    // Agar address hai to edit mode, nahi to add mode
    setCurrentAddress(
      address || {
        type: "Home",
        name: "",
        addressLine1: "",
        cityStateZip: "",
        phone: "",
      }
    );
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentAddress(null);
  };

  const handleDeleteAddress = (idToDelete) => {
    setAddresses(addresses.filter((addr) => addr.id !== idToDelete));
    // Yahan aap API call bhi kar sakte hain delete karne ke liye
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress({ ...currentAddress, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (currentAddress.id) {
      // Edit logic
      setAddresses(
        addresses.map((addr) =>
          addr.id === currentAddress.id ? currentAddress : addr
        )
      );
    } else {
      // Add logic
      setAddresses([
        ...addresses,
        { ...currentAddress, id: Date.now(), default: false },
      ]); // Using timestamp for unique ID
    }
    handleCloseModal();
  };

  return (
    <div className={classes.pageContainer}>
      <Box className={classes.headerContainer}>
        <Typography variant="h4" className={classes.pageTitle}>
          Address Book
        </Typography>
      </Box>

      {/* [FIX] alignItems="stretch" hata diya gaya hai */}
      <Grid container spacing={4}>
        {addresses.map((addr) => (
          <Grid item xs={12} md={6} key={addr.id}>
            <Card
              className={`${classes.addressCard} ${addr.default ? classes.defaultCard : ""}`}
            >
              <CardContent className={classes.cardContent}>
                <Box className={classes.cardHeader}>
                  <Typography variant="h6" className={classes.addressType}>
                    {addr.type === "Home" ? <HomeIcon /> : <WorkIcon />}
                    {addr.type}
                  </Typography>
                  {addr.default && (
                    <Chip
                      label="Default"
                      size="small"
                      className={classes.defaultChip}
                    />
                  )}
                </Box>
                <Divider style={{ marginBottom: "16px" }} />
                <Box>
                  <Typography variant="body1" style={{ fontWeight: 500 }}>
                    {addr.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {addr.addressLine1}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {addr.cityStateZip}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Phone: {addr.phone}
                  </Typography>
                </Box>
              </CardContent>
              <Box className={classes.cardActions}>
                <IconButton size="small" onClick={() => handleOpenModal(addr)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  style={{ color: "#dc3545" }}
                  onClick={() => handleDeleteAddress(addr.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}

        {/* Add New Address Card */}
        <Grid item xs={12} md={6}>
          <Card
            className={classes.addAddressCard}
            onClick={() => handleOpenModal()}
          >
            <CardContent>
              <AddIcon style={{ fontSize: 40, color: colors.primary }} />
              <Typography
                variant="h6"
                style={{ color: colors.primary, marginTop: 8 }}
              >
                Add New Address
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add/Edit Address Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        className={classes.modal}
      >
        <div className={classes.modalPaper}>
          <Box className={classes.modalHeader}>
            <Typography variant="h6">
              {currentAddress?.id ? "Edit Address" : "Add New Address"}
            </Typography>
            <IconButton onClick={handleCloseModal} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  fullWidth
                  label="Full Name"
                  value={currentAddress?.name || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="addressLine1"
                  fullWidth
                  label="Address Line 1"
                  value={currentAddress?.addressLine1 || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="cityStateZip"
                  fullWidth
                  label="City, State, ZIP Code"
                  value={currentAddress?.cityStateZip || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phone"
                  fullWidth
                  label="Phone Number"
                  value={currentAddress?.phone || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.buttonPrimary}
                >
                  {currentAddress?.id ? "Save Changes" : "Add Address"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddressPage;
