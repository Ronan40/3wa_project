import "./footer.css";

const Footer = () => {
  const footerdate = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="fText">
        Copyright © {footerdate} SleepWell.com™. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
