import React, { useState } from "react";
import ModalC from "../Modal";

const display = {
  flex: {
    display: "flex",
    justifyContent: "space-between",
    margin: "15px",
  },
  contact: {
    padding: "0 33px",
    textDecorationLine: "none",
    color: "#007bff",
    cursor: "pointer",
  },
  sticky: {
    width: "100%",
    position: "absolute",
    background: "#343a40",
    marginTop: 50,
  },
  credit: {
    textAlign: "center",
    borderTop: "1px black solid",
    // margin: "20px 300px",
    padding: "10px",
  },
  each: {
    margin: " 0 5px",
  },
  LinkText: {
    color: "white",
    textDecoration: "none",
  },
};

function Footer() {
  const [currentText, setCurrentText] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div style={display.sticky}>
      <div style={display.flex}>
        <div style={{ color: "#007bff" }}>
          <span> &copy; 2021 Global Trade, Inc.</span>
        </div>
        <div>
          <span
            style={display.contact}
            onClick={() => {
              setIsModalOpen(true);
              setCurrentText("CONTACT US");
            }}
          >
            CONTACT US
          </span>
          <span
            style={display.contact}
            onClick={() => {
              setIsModalOpen(true);
              setCurrentText("Privacy Policy");
            }}
          >
            Privacy Policy
          </span>
          {isModalOpen && (
            <ModalC
              onClose={toggleModal}
              isModalOpen={isModalOpen}
              currentText={currentText}
            ></ModalC>
          )}
        </div>
      </div>
      <div style={display.credit}>
        <img
          style={display.each}
          alt="cc cards"
          src="https://img.icons8.com/color/30/000000/visa.png"
        />
        <img
          style={display.each}
          alt="cc cards"
          src="https://img.icons8.com/ios-filled/30/000000/mastercard.png"
        />
        <img
          style={display.each}
          alt="cc cards"
          src="https://img.icons8.com/color/30/000000/amex.png"
        />
        <img
          style={display.each}
          alt="cc cards"
          src="https://img.icons8.com/color/30/000000/discover.png"
        />
        <img
          style={display.each}
          alt="cc cards"
          src="https://img.icons8.com/ios-filled/30/000000/apple-pay.png"
        />
        <img
          style={display.each}
          alt="cc cards"
          src="https://img.icons8.com/color/30/000000/google-pay-india.png"
        />
        <img
          style={display.each}
          alt="cc cards"
          src="https://img.icons8.com/windows/30/000000/amazon-pay.png"
        />
        <img
          style={display.each}
          alt="cc cards"
          src="https://img.icons8.com/color/30/000000/samsung.png"
        />
      </div>
    </div>
  );
}

export default Footer;
