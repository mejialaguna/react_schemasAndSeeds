import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Form } from "react-bootstrap";
import Auth from "../../../utils/auth";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../../utils/mutations";
import Snackbar from "../../SnackBar";

const display = {
  width: {
    width: "100%",
  },
  main: {
    margin: "0 auto",
  },
  modalmargin: {
    marginTop: "100px",
  },
  pointer: {
    color: "blue",
    cursor: "pointer",
  },
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <span>Global Trade</span>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn(props) {
  const [open, setOpen] = React.useState(false);
  const { currentText, setCurrentText } = props;
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error }] = useMutation(LOGIN_USER);

 const handleClick = () => {
   setOpen(true);
 };

  // update state based on form input changes
  const handleInputChange = (event) => {
    event.persist();
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.persist();

    try {
      const { data } = await login({
        variables: {
          email: userFormData.email,
          password: userFormData.password,
        },
      });

      Auth.login(data.login.token);
      console.log("data", data);
    } catch (e) {
      console.error(e);
    }

    setUserFormData({
      email: "",
      password: "",
    });

    console.log({
      userFormData,
    });
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          noValidate
          validated={validated.toString()}
          onSubmit={handleSubmit}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            style={display.main}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" sx={{ mt: 1 }} style={display.width}>
              <Alert
                dismissible
                onClose={() => setShowAlert(false)}
                show={showAlert}
                variant="danger"
              >
                sorry ... wrong Email/password
              </Alert>
              <Grid htmlFor="email">
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  type="text"
                  value={userFormData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Form.Control.Feedback type="invalid">
                {error && <div>Email is required!</div>}
              </Form.Control.Feedback>
              <Grid htmlFor="password">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleInputChange}
                  value={userFormData.password}
                />
              </Grid>
              <Form.Control.Feedback type="invalid">
                {error && <div>Password is required!</div>}
              </Form.Control.Feedback>
              <Button
                disabled={!(userFormData.email &&
                  userFormData.password)}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <Snackbar
                  handleClick={handleClick}
                  setOpen={setOpen}
                  open={open}
                  currentText={currentText}
                  severity={"success"}
                  message="Welcome Back."
                />
              </Button>
              <Grid container>
                <Grid item style={display.main}>
                  <Typography
                    onClick={() => setCurrentText("Sign UP")}
                    style={display.pointer}
                  >
                    Don't have an account? Sign Up
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
