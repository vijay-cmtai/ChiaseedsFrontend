// src/main-component/LoginPage/index.js (Final Version with 50% Form Width)

import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/actions/action";

// --- "Vibrant Gradient" Color Theme ---
const colors = {
  primary: "#878fba",
  primaryHover: "#6c749d",
  textDark: "#3d2b56",
  textMuted: "#6c749d",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
  cardBg: "rgba(255, 255, 255, 0.9)",
  borderColor: "rgba(61, 43, 86, 0.2)",
};

const useStyles = makeStyles((theme) => ({
  pageWrapper: {
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
  },
  formCard: {
    // === YAHAN BADLAAV KIYA GAYA HAI ===
    width: "50%", // Form ki width 50% kar di gayi hai
    maxWidth: "600px", // Lekin 600px se zyada badi nahi hogi
    minWidth: "320px", // Kam se kam 320px rahegi
    padding: theme.spacing(3),
    borderRadius: "16px",
    backgroundColor: colors.cardBg,
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    textAlign: "center",
    color: colors.textMuted,
    marginBottom: theme.spacing(4),
  },
  inputField: {
    "& label.Mui-focused": {
      color: colors.primary,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: colors.borderColor,
      },
      "&:hover fieldset": {
        borderColor: colors.primary,
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.primary,
      },
    },
  },
  submitButton: {
    backgroundColor: colors.primary,
    color: "#ffffff",
    fontWeight: "bold",
    borderRadius: "8px",
    padding: theme.spacing(1.5, 0),
    marginTop: theme.spacing(1),
    "&:hover": {
      backgroundColor: colors.primaryHover,
    },
  },
  noteHelp: {
    textAlign: "center",
    marginTop: theme.spacing(3),
    fontSize: "14px",
    color: colors.textMuted,
    "& a": {
      color: colors.primary,
      fontWeight: "bold",
      textDecoration: "none",
    },
  },
  errorMessage: {
    color: "#e64444",
    fontSize: "12px",
    paddingTop: "4px",
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState({ email: "", password: "" });
  const [validator] = useState(
    new SimpleReactValidator({ className: classes.errorMessage })
  );

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    validator.showMessages();
  };

  const authenticateUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.find(
      (user) => user.email === email && user.password === password
    );
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      const user = authenticateUser(value.email, value.password);
      if (user) {
        dispatch(loginSuccess(user));
        navigate(
          user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"
        );
      } else {
        toast.error("Invalid email or password!");
      }
    } else {
      validator.showMessages();
      toast.error("Please fill all fields correctly!");
    }
  };

  return (
    <div className={classes.pageWrapper}>
      <Card className={classes.formCard}>
        <CardContent>
          <Typography variant="h4" className={classes.title}>
            Sign In
          </Typography>
          <Typography className={classes.subtitle}>
            Sign in to your account
          </Typography>
          <form onSubmit={submitForm}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="E-mail"
                  name="email"
                  value={value.email}
                  variant="outlined"
                  onChange={changeHandler}
                  className={classes.inputField}
                />
                {validator.message("email", value.email, "required|email")}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={value.password}
                  variant="outlined"
                  onChange={changeHandler}
                  className={classes.inputField}
                />
                {validator.message("password", value.password, "required")}
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
          <Typography className={classes.noteHelp}>
            Don't have an account? <Link to="/register">Create an account</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
