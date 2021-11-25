import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { CONTACT_FORM } from "../../utils/mutations";
import { validateEmail } from "../../utils/helpers";
import Auth from "../../utils/auth";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const display = {
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  margin: {
    margin: "60px",
  },
  form: {
    width: "80%",
  },
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ContactForm() {
  const [formState, setFormState] = useState({
    userId: "",
    email: "",
    contactBody: "",
  });
  const [validated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [contactForm] = useMutation(CONTACT_FORM);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function handleChange(e) {
    if (e.target.name === "email") {
      const isValid = validateEmail(e.target.value);
      console.log(isValid);
      if (!isValid) {
        setErrorMessage("your email is invalid.");
      } else {
        setErrorMessage("");
        console.log("valid email");
      }
    } else {
      if (!e.target.value.length) {
        setErrorMessage(`${e.target.name} is required`);
      } else {
        setErrorMessage("");
      }
    }

    if (!errorMessage) {
      setFormState({ ...formState, [e.target.name]: e.target.value });      
    }
  }

  // <~!------------------------------------------------------------------------------------!~>

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errorMessage) {
      setFormState({ [e.target.name]: e.target.value });
      console.log("Form", formState);
    }

    try {
      const { data } = await contactForm({
        variables: {
          email: formState.email,
          contactBody: formState.contactBody,
        },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: "",
      contactBody: "",
    });
  };

  return (
    <section>
      <div style={display.center}>
        <Form
          onSubmit={handleSubmit}
          style={display.form}
          validated={validated.toString()}
        >
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Email address:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              Value={formState.email}
              onBlur={handleChange}
              placeholder="name@example.com"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="message">Message:</Form.Label>
            <Form.Control
              rows={3}
              name="contactBody"
              type="contactBody"
              Value={formState.contactBody}
              onChange={handleChange}
            />
          </Form.Group>
          {errorMessage && (
            <div>
              <p className="error-text">{errorMessage}</p>
            </div>
          )}
          <Button
            onClick={handleClick}
            variant="primary"
            type="submit"
            disabled={!(formState.email && formState.contactBody)}
          >
            Submit
          </Button>
          {Auth.loggedIn() && !errorMessage ? (
            <Stack spacing={2} sx={{ width: "100%" }}>
              <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={(handleClose, Auth.contactUs)}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Thank you for your feedBack , we appreciate your bussiness !
                </Alert>
              </Snackbar>
            </Stack>
          ) : (
            <Stack spacing={2} sx={{ width: "100%" }}>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  sorry but you need to be log-in to be able to reach us!
                </Alert>
              </Snackbar>
            </Stack>
          )}
        </Form>
      </div>
    </section>
  );
}
export default ContactForm;
