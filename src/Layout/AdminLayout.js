// src/Layout/AdminLayout.js (Final Version with Dark Sidebar Theme)

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
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PeopleIcon from "@material-ui/icons/People";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logout } from "../store/actions/action";

// --- NEW "Dark & Professional" Sidebar Theme ---
const colors = {
  primary: "#a96e4f", // The main "Earthy" brown color
  sidebarBg: "#2c3e50", // Deep charcoal for the sidebar
  sidebarHeaderBg: "rgba(0, 0, 0, 0.15)", // Subtle dark background for the header
  sidebarText: "rgba(255, 255, 255, 0.7)", // Softer white text
  sidebarTextActive: "#ffffff", // Pure white for active/hover text
  background: "#f9f7f3", // Warm, light cream content background
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
    backgroundColor: colors.background,
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
    padding: theme.spacing(2, 1),
  },
  listItem: {
    margin: theme.spacing(0.5, 1),
    padding: theme.spacing(1.5, 3),
    color: colors.sidebarText,
    borderRadius: "8px",
    transition: "all 0.2s ease",
    "& .MuiListItemIcon-root": {
      color: colors.sidebarText,
      minWidth: "40px",
      transition: "color 0.2s ease",
    },
    "& .MuiListItemText-primary": {
      fontWeight: 400,
    },
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: colors.sidebarTextActive,
      "& .MuiListItemIcon-root": {
        color: colors.sidebarTextActive,
      },
    },
  },
  activeLink: {
    backgroundColor: colors.primary, // Use the main primary color
    color: colors.sidebarTextActive,
    boxShadow: "0 4px 15px rgba(169, 110, 79, 0.3)",
    "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
      color: colors.sidebarTextActive,
      fontWeight: 500,
    },
    "&:hover": {
      backgroundColor: colors.primary,
    },
  },
  divider: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

const AdminLayout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const adminNavItems = [
    { text: "Dashboard", to: "/admin/dashboard", icon: <DashboardIcon /> },
    { text: "Products", to: "/admin/products", icon: <ShoppingCartIcon /> },
    { text: "Orders", to: "/admin/orders", icon: <ListAltIcon /> },
    { text: "Users", to: "/admin/users", icon: <PeopleIcon /> },
    
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
              ADMIN PANEL
            </Typography>
          </div>
          <List className={classes.navList}>
            {adminNavItems.map((item) => (
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

export default AdminLayout;
