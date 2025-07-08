// src/main-component/SignUpPage/index.js (Final Version with 50% Form Width)

import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  makeStyles,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

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
  error: "#e64444",
};

const useStyles = makeStyles((theme) => ({
  pageWrapper: {
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4, 2),
  },
  formCard: {
    // === YAHAN BADLAAV KIYA GAYA HAI ===
    width: "50%",
    maxWidth: "700px", // Form 700px se zyada bada nahi hoga
    minWidth: "350px", // Form 350px se chhota nahi hoga
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
    "& label.Mui-focused": { color: colors.primary },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: colors.borderColor },
      "&:hover fieldset": { borderColor: colors.primary },
      "&.Mui-focused fieldset": { borderColor: colors.primary },
    },
  },
  submitButton: {
    backgroundColor: colors.primary,
    color: "#ffffff",
    fontWeight: "bold",
    borderRadius: "8px",
    padding: theme.spacing(1.5, 0),
    marginTop: theme.spacing(1),
    "&:hover": { backgroundColor: colors.primaryHover },
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
    color: colors.error,
    fontSize: "12px",
    paddingTop: "4px",
  },
  formControl: {
    marginTop: theme.spacing(1),
    "& .MuiFormLabel-root": {
      color: colors.textMuted,
      fontWeight: "bold",
    },
    "& .MuiRadio-root": {
      color: colors.textMuted,
    },
    "& .Mui-checked": {
      color: `${colors.primary} !important`,
    },
  },
}));

const SignUpPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [value, setValue] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "user",
  });

  const [validator] = useState(
    new SimpleReactValidator({ className: classes.errorMessage })
  );

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    validator.showMessages();
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.find((user) => user.email === value.email);

      if (userExists) {
        toast.error("This email is already registered!");
        return;
      }

      const newUser = {
        fullName: value.full_name,
        email: value.email,
        password: value.password,
        role: value.role,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      toast.success("Registration complete! Please login.");
      navigate("/login");
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
            Create Account
          </Typography>
          <Typography className={classes.subtitle}>
            Get started with a free account
          </Typography>
          <form onSubmit={submitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="full_name"
                  value={value.full_name}
                  variant="outlined"
                  onChange={changeHandler}
                  className={classes.inputField}
                />
                {validator.message(
                  "full name",
                  value.full_name,
                  "required|alpha_space"
                )}
              </Grid>
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
                {validator.message(
                  "password",
                  value.password,
                  "required|min:6"
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirm_password"
                  type="password"
                  value={value.confirm_password}
                  variant="outlined"
                  onChange={changeHandler}
                  className={classes.inputField}
                />
                {validator.message(
                  "confirm password",
                  value.confirm_password,
                  `required|in:${value.password}`
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">Register as</FormLabel>
                  <RadioGroup
                    row
                    aria-label="role"
                    name="role"
                    value={value.role}
                    onChange={changeHandler}
                  >
                    <FormControlLabel
                      value="user"
                      control={<Radio />}
                      label="User"
                    />
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label="Admin"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
          <Typography className={classes.noteHelp}>
            Already have an account? <Link to="/login">Return to Sign In</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
