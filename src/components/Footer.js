import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import WhatsappOutlinedIcon from "@mui/icons-material/WhatsappOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";


export const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="footer-location">
          <h3>Location</h3>
          <div style={{ textAlign: "center" }}>
            <div>Beirut Lebanon</div>
          </div>
        </div>
        <div className="footer-around-web">
          <h3>Around The Web</h3>
          <div className="footer-icon">
            <div>
              <FacebookOutlinedIcon className="footer-icon-size" />
            </div>
            <div>
              <WhatsappOutlinedIcon className="footer-icon-size" />
            </div>
            <div>
              <EmailOutlinedIcon className="footer-icon-size" />
            </div>
          </div>
        </div>
        <div className="footer-about" id="about">
          <h3>About</h3>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ulla
          </div>
        </div>
      </div>
    </div>
  );
};
