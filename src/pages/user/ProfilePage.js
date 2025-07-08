// src/pages/user/ProfilePage.js (Final Version with corrected TextField UI)

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Box,
  Avatar,
  Badge,
  IconButton,
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { useSelector } from 'react-redux';

// --- Color Palette from the image ---
const colors = {
  primary: '#a96e4f',       // Warm, earthy brown for buttons
  primaryHover: '#8e5a3e', // Darker brown for hover
  textDark: '#2c3e50',      // Deep charcoal for headings and input text
  textMuted: '#8a8a8a',     // Grey color for labels
  background: '#f9f7f3',   // Warm, light cream page background
  cardBg: '#ffffff',        // Clean white for cards
  borderColor: '#d1d1d1',   // Subtle grey for input borders
};

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: theme.spacing(3),
    backgroundColor: colors.background,
    minHeight: '100%',
  },
  pageTitle: {
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: theme.spacing(4),
  },
  profileCard: {
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.07)",
    backgroundColor: colors.cardBg,
    padding: theme.spacing(3),
    height: '100%',
  },
  sectionTitle: {
    fontWeight: 600,
    color: colors.textDark,
    marginBottom: theme.spacing(3),
    paddingBottom: theme.spacing(1.5),
    borderBottom: `1px solid ${colors.borderColor}`,
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  largeAvatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    border: `3px solid ${colors.borderColor}`,
  },
  editBadge: {
    backgroundColor: colors.primary,
    color: "white",
    width: 32,
    height: 32,
    border: `2px solid ${colors.white}`,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    color: "#fff",
    fontWeight: "bold",
    borderRadius: '8px',
    padding: theme.spacing(1.5, 4),
    marginTop: theme.spacing(3),
    "&:hover": {
      backgroundColor: colors.primaryHover,
    },
  },
  // === UPDATED STYLE FOR TEXT FIELDS TO MATCH IMAGE ===
  inputField: {
    '& .MuiInputLabel-root': { // Default state of the label
      color: colors.textMuted,
    },
    '& label.Mui-focused': { // State when you click on the input
      color: colors.primary,
    },
    '& .MuiOutlinedInput-root': {
      // The text you type
      '& .MuiOutlinedInput-input': {
          color: colors.textDark,
      },
      // The border
      '& fieldset': {
        borderColor: colors.borderColor,
      },
      // On hover
      '&:hover fieldset': {
        borderColor: colors.primary,
      },
      // On focus
      '&.Mui-focused fieldset': {
        borderColor: colors.primary,
      },
    },
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const { user } = useSelector(state => state.auth);

  return (
    <div className={classes.pageContainer}>
      <Typography variant="h4" className={classes.pageTitle}>
        My Profile
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column: Profile Picture & Personal Details */}
        <Grid item xs={12} md={5}>
          <Card className={classes.profileCard}>
            <CardContent>
              <Box className={classes.avatarContainer}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="icon-button-file"
                  type="file"
                />
                <label htmlFor="icon-button-file">
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <IconButton component="span" className={classes.editBadge}>
                        <PhotoCamera fontSize="small" />
                      </IconButton>
                    }
                  >
                    <Avatar
                      src={user?.avatar || "https://i.pravatar.cc/150"} // Dummy image
                      className={classes.largeAvatar}
                    />
                  </Badge>
                </label>
              </Box>

              <Typography variant="h6" className={classes.sectionTitle}>
                Personal Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    defaultValue={user?.fullName || ''}
                    className={classes.inputField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    value={user?.email || ''}
                    disabled // Disabled fields have a different look by default
                    className={classes.inputField}
                  />
                </Grid>
              </Grid>
              <Box textAlign="center" mt={2}>
                <Button variant="contained" className={classes.buttonPrimary}>
                  SAVE PROFILE
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column: Change Password */}
        <Grid item xs={12} md={7}>
          <Card className={classes.profileCard}>
            <CardContent>
              <Typography variant="h6" className={classes.sectionTitle}>
                Change Password
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    type="password"
                    variant="outlined"
                    className={classes.inputField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    variant="outlined"
                    className={classes.inputField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type="password"
                    variant="outlined"
                    className={classes.inputField}
                  />
                </Grid>
              </Grid>
              <Box textAlign="center" mt={2}>
                <Button variant="contained" className={classes.buttonPrimary}>
                  UPDATE PASSWORD
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
export default ProfilePage;