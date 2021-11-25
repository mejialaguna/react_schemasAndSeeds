import React, {useState} from 'react';
import ModalC from "../Modal";


const display = {
  back: {},
  flex: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
  },
  contact: {
    padding: "0 33px",
    textDecorationLine: "none",
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
    margin: "20px 300px",
    padding: "10px"
  },
  each: {
    margin:" 0 5px"
  }
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
        {/* <div>
          <img
            style={{ marginRight: 10 }}
            src="https://img.icons8.com/color/30/000000/linkedin.png"
          ></img>
          <img
            style={{ marginRight: 10 }}
            src="https://img.icons8.com/color/30/000000/github--v3.png"
          ></img>
          <img
            style={{ marginRight: 10 }}
            src="https://img.icons8.com/fluency/30/000000/twitter-squared.png"
          ></img>
          <img
            style={{ marginRight: 10 }}
            src="https://img.icons8.com/color/38/000000/stackoverflow.png"
          ></img>
          <img
            style={{ marginRight: 10 }}
            src="https://img.icons8.com/color/30/000000/instagram-new--v1.png"
          />
          <img
            style={{ marginRight: 10 }}
            src="https://img.icons8.com/color/30/000000/facebook-new.png"
          />
          <img
            style={{ marginRight: 10 }}
            src="https://img.icons8.com/color/30/000000/pinterest--v6.png"
          />
        </div> */}
        <div>
          <a
            href="#"
            onClick={() => {
              setIsModalOpen(true);
              setCurrentText("CONTACT US");
            }}
            style={display.contact}
          >
            CONTACT US
          </a>
          <a
            href="#"
            onClick={() => {
              setIsModalOpen(true);
              setCurrentText("Privacy Policy");
            }}
            style={display.contact}
          >
            {" "}
            Privacy Policy
          </a>
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
        <img style={display.each} src="https://img.icons8.com/color/30/000000/visa.png" />
        <img style={display.each}  src="https://img.icons8.com/ios-filled/30/000000/mastercard.png" />
        <img style={display.each}  src="https://img.icons8.com/color/30/000000/amex.png" />
        <img style={display.each}  src="https://img.icons8.com/color/30/000000/discover.png" />
        <img style={display.each}  src="https://img.icons8.com/ios-filled/30/000000/apple-pay.png" />
        <img style={display.each}  src="https://img.icons8.com/color/30/000000/google-pay-india.png" />
        <img style={display.each}  src="https://img.icons8.com/windows/30/000000/amazon-pay.png" />
        <img style={display.each}  src="https://img.icons8.com/color/30/000000/samsung.png" />
      </div>
    </div>
  );
    }   

export default Footer;