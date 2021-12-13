import React, { useState } from "react";
import { Nav, Modal, Tab } from "react-bootstrap";
import SignIn from "../Sign/SignIn";
import SignupForm from "../Sign/SignupForm";
import Auth from "../../utils/auth";
import TextInput from "../TextInput";

const display = {
  nav: {
    justifyContent: "space-between",
    borderBottom: "none",
  },
  inline: {
    display: "flex",
    // marginTop: 8
  },
  modalmargin: {
    marginTop: "50px",
  },
   border: {
    border: "none"
  } 
};

function AppNavbar({setProducts}) {
  const [showModal, setShowModal] = useState(false);
  const [currentText, setCurrentText] = useState();

  return (
    <>
      <div className="topnav">
        <Nav variant="tabs" defaultActiveKey="/home" style={display.nav}>
          <TextInput setProducts={setProducts} />
          <div style={display.inline}>
            {Auth.loggedIn() ? (
              <Nav.Link onClick={Auth.logout} style={display.border}>
                Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link
                    style={display.border}
                    onClick={() => {
                      setShowModal(true);
                      setCurrentText("Sign In");
                    }}
                  >
                    Sign In
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    style={display.border}
                    onClick={() => {
                      setShowModal(true);
                      setCurrentText("Sign Up");
                    }}
                  >
                    Sign Up
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </div>
        </Nav>
        <Modal
          size=""
          animation={false}
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby="signup-modal"
          style={display.modalmargin}
        >
          <Tab.Container defaultActiveKey="login">
            <Modal.Body style={{ padding: "0" }}>
              {currentText === "Sign In" ? (
                <SignIn
                  currentText={currentText}
                  setCurrentText={setCurrentText}
                />
              ) : (
                <SignupForm
                  currentText={currentText}
                  setCurrentText={setCurrentText}
                />
              )}
            </Modal.Body>
          </Tab.Container>
        </Modal>
      </div>
    </>
  );
}

export default AppNavbar;