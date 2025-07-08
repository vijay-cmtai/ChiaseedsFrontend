// src/pages/admin/ManageUsersPage.js (Corrected Code)

import React, { useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@material-ui/core";
// import { Link } from "react-router-dom"; // <--- THIS LINE IS REMOVED
import EditIcon from "@material-ui/icons/Edit";
import BlockIcon from "@material-ui/icons/Block";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";

// Theme colors
const colors = {
  primary: "#878fba",
  textDark: "#3d2b56",
  textMuted: "#6c749d",
  borderColor: "#e9ecef",
  lightBg: "#f8f9fa",
  cardBg: "#ffffff",
  green: "#28a745",
  lightGreen: "#e7f5ee",
  red: "#dc3545",
  lightRed: "#fdeeee",
  lightGray: "#e9ecef",
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
  buttonPrimary: {
    backgroundColor: colors.primary,
    color: "#fff",
    padding: "6px 16px",
    textTransform: "none",
    "&:hover": { backgroundColor: "#6c749d" },
  },
  contentCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
    "& .MuiCardContent-root:last-child": { paddingBottom: 0 },
  },
  toolbar: {
    padding: theme.spacing(2, 3),
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
    "&:hover": { backgroundColor: "#f5f5f5" },
  },
  userCell: { display: "flex", alignItems: "center" },
  avatar: { marginRight: theme.spacing(2) },
  userName: { fontWeight: 500, color: colors.textDark },
  userEmail: { color: colors.textMuted, fontSize: "0.8rem" },
  chip: { borderRadius: "16px", fontWeight: "bold", height: "26px" },
  roleAdmin: { backgroundColor: colors.primary, color: "white" },
  roleUser: { backgroundColor: colors.lightGray, color: colors.textMuted },
  statusActive: { backgroundColor: colors.lightGreen, color: colors.green },
  statusBanned: { backgroundColor: colors.lightRed, color: colors.red },
}));

const users = [
  // ... (dummy data remains the same)
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "User",
    status: "Active",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "User",
    status: "Active",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
    status: "Active",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Kevin Brown",
    email: "kevin.b@example.com",
    role: "User",
    status: "Banned",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
  },
];

const ManageUsersPage = () => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleOpenAddDialog = () => {
    setEditingUser(null);
    setDialogOpen(true);
  };

  const handleOpenEditDialog = (user) => {
    setEditingUser(user);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveUser = () => {
    console.log("Saving user:", editingUser);
    handleCloseDialog();
  };

  return (
    <div className={classes.pageContainer}>
      <Box className={classes.headerContainer}>
        <Typography variant="h4" className={classes.pageTitle}>
          Manage Users
        </Typography>
        <Button
          onClick={handleOpenAddDialog}
          variant="contained"
          className={classes.buttonPrimary}
          startIcon={<AddIcon />}
        >
          Add New User
        </Button>
      </Box>
      <Card className={classes.contentCard}>
        <Box className={classes.toolbar}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Search users..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
          />
        </Box>
        <TableContainer>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className={classes.tableRow}>
                  <TableCell>
                    <Box className={classes.userCell}>
                      <Avatar src={user.avatarUrl} className={classes.avatar} />
                      <Box>
                        <Typography
                          variant="body1"
                          className={classes.userName}
                        >
                          {user.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          className={classes.userEmail}
                        >
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      className={`${classes.chip} ${user.role === "Admin" ? classes.roleAdmin : classes.roleUser}`}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      className={`${classes.chip} ${user.status === "Active" ? classes.statusActive : classes.statusBanned}`}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenEditDialog(user)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" style={{ color: colors.red }}>
                      <BlockIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {editingUser ? "Edit User" : "Add New User"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                label="Full Name"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={editingUser?.name || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                defaultValue={editingUser?.email || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Password (optional)"
                type="password"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveUser} className={classes.buttonPrimary}>
            {editingUser ? "Save Changes" : "Create User"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageUsersPage;
