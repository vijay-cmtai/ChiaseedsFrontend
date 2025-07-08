// src/Layout/UserDashboardLayout.js (Final Version with Enhanced Sidebar UI)

import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  makeStyles,
  CssBaseline,
  Divider,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logout } from "../store/actions/action";

// --- REFINED Dark Sidebar Color Palette ---
const colors = {
  primary: "#878fba",
  sidebarBg: "#2c3e50", // A sophisticated dark blue-grey
  sidebarHeaderBg: "rgba(0, 0, 0, 0.1)", // Subtle dark background for the header
  sidebarText: "rgba(255, 255, 255, 0.7)", // Softer white text
  sidebarTextActive: "#ffffff",
  sidebarActiveBg: "rgba(255, 255, 255, 0.1)",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
};

const drawerWidth = 260; // Slightly wider for better spacing

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    fontFamily: "'Poppins', sans-serif",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: colors.sidebarBg,
    borderRight: "none",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
    background: `linear-gradient(to bottom right, ${colors.gradientStart}, ${colors.gradientEnd})`,
    minHeight: "100vh",
  },
  sidebarHeader: {
    padding: theme.spacing(3),
    textAlign: "center",
    backgroundColor: colors.sidebarHeaderBg,
  },
  sidebarHeaderText: {
    fontSize: "20px",
    fontWeight: "600",
    color: colors.sidebarTextActive,
    letterSpacing: "1px",
  },
  navList: {
    flexGrow: 1,
    padding: theme.spacing(2, 1), // Add some padding around the list
  },
  listItem: {
    margin: theme.spacing(0.5, 1), // Margin around each item
    padding: theme.spacing(1.5, 3), // Padding inside each item
    color: colors.sidebarText,
    borderRadius: "8px", // Rounded corners for a modern look
    transition: "all 0.2s ease",
    "& .MuiListItemIcon-root": {
      color: colors.sidebarText,
      minWidth: "40px", // Align icons properly
      transition: "color 0.2s ease",
    },
    "& .MuiListItemText-primary": {
      fontWeight: 400,
    },
    "&:hover": {
      backgroundColor: colors.sidebarActiveBg,
      color: colors.sidebarTextActive,
      "& .MuiListItemIcon-root": {
        color: colors.sidebarTextActive,
      },
    },
  },
  activeLink: {
    backgroundColor: colors.primary, // Use the main primary color for active link background
    color: colors.sidebarTextActive,
    boxShadow: "0 4px 15px rgba(135, 143, 186, 0.3)",
    "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
      color: colors.sidebarTextActive,
      fontWeight: 500,
    },
    "&:hover": {
      // Keep hover state consistent with active state
      backgroundColor: colors.primary,
    },
  },
  divider: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

const UserDashboardLayout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const userNavItems = [
    { text: "Dashboard", to: "/user/dashboard", icon: <DashboardIcon /> },
    { text: "My Orders", to: "/user/orders", icon: <ShoppingBasketIcon /> },
    { text: "Profile", to: "/user/profile", icon: <AccountCircleIcon /> },
    { text: "Address", to: "/user/address", icon: <LocationOnIcon /> },
    { text: "Wishlist", to: "/user/wishlist", icon: <FavoriteIcon /> },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <div className={classes.sidebarHeader}>
            <Typography variant="h5" className={classes.sidebarHeaderText}>
              USER PANEL
            </Typography>
          </div>
          <List className={classes.navList}>
            {userNavItems.map((item) => (
              <ListItem
                button
                component={NavLink}
                to={item.to}
                key={item.text}
                className={classes.listItem}
                activeClassName={classes.activeLink}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </div>

        <div>
          <Divider className={classes.divider} />
          <ListItem button onClick={handleLogout} className={classes.listItem}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboardLayout;
