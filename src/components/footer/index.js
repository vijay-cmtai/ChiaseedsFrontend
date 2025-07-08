import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png"; // Make sure the logo path is correct

// --- New Color Palette (Inspired by the Blueberry Image) ---
const colors = {
  backgroundDark: "#3d2b56", // Deep purple from blackberry
  backgroundLighter: "#2c1f4a", // Even darker purple for the bottom bar
  accent: "#f5e5a4", // Creamy yellow from the flower
  textPrimary: "#e0e0e0", // Soft white for readability
  textSecondary: "#d1d1d1", // Slightly dimmer for links
  textHighlight: "#ffffff", // Pure white for the logo
};

const Footer = (props) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  // CSS styles are embedded here using a <style> tag
  const footerStyles = `
    /* =======================================================
       NEW FOOTER THEME - FROSTED BLUEBERRY
       ======================================================= */

    /* Main Footer Container */
    .tp-site-footer {
      background-color: ${colors.backgroundDark};
      color: ${colors.textPrimary};
      position: relative;
      z-index: 1;
      border-top: 4px solid ${colors.accent}; /* Yellow top border */
    }

    /* Hide the old theme's honeycomb/bee shapes */
    .footer-shape1,
    .footer-shape2 {
      display: none;
    }

    /* Widget Titles (Headings) */
    .tp-site-footer .widget-title h3 {
      color: ${colors.accent}; /* Creamy Yellow */
      font-weight: 600;
    }

    /* Paragraph Text */
    .tp-site-footer p {
      color: ${colors.textPrimary};
    }

    /* Links */
    .tp-site-footer a {
      color: ${colors.textSecondary};
      transition: color 0.3s ease;
      text-decoration: none;
    }

    .tp-site-footer a:hover {
      color: ${colors.accent}; /* Hover becomes yellow */
    }

    /* Logo Text */
    .tp-site-footer .logo a {
      color: ${colors.textHighlight};
      font-weight: 600;
    }

    /* Contact Info Icons */
    .contact-ft ul li i {
      color: ${colors.accent};
    }

    /* Social Media Icons */
    .about-widget ul li a {
      background-color: rgba(245, 229, 164, 0.1); /* Transparent yellow */
      color: ${colors.textHighlight};
      border-radius: 50%;
      transition: all 0.3s ease;
    }

    .about-widget ul li a:hover {
      background-color: ${colors.accent}; /* Full yellow on hover */
      color: ${colors.backgroundDark}; /* Icon color becomes dark purple */
    }

    /* Newsletter Form */
    .newsletter-widget form input {
      background-color: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(245, 229, 164, 0.2);
      color: ${colors.textHighlight};
    }
    .newsletter-widget form input::placeholder {
      color: ${colors.textSecondary};
    }
    .newsletter-widget form button {
      background-color: ${colors.accent};
      color: ${colors.backgroundDark};
    }

    /* Bottom Footer (Copyright section) */
    .tp-lower-footer {
      background-color: ${colors.backgroundLighter};
      border-top: 1px solid rgba(245, 229, 164, 0.1);
    }

    .tp-lower-footer .copyright {
      color: #b0aacc; /* Muted purple text */
    }

    .tp-lower-footer .copyright a {
      color: ${colors.accent};
      font-weight: 600;
    }

    .tp-lower-footer .copyright a:hover {
      text-decoration: underline;
    }
  `;

  return (
    <>
      {/* We inject the styles into the document's head */}
      <style>{footerStyles}</style>

      <footer className="tp-site-footer">
        <div className="tp-upper-footer">
          <div className="container">
            <div className="row">
              <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="widget about-widget">
                  <div className="logo widget-title">
                    <Link onClick={ClickHandler} to="/">
                      <img src={Logo} alt="ft-logo" /> Chia Seeds
                    </Link>
                  </div>
                  <p>
                    Management consulting includes a broad range of activities,
                    and the many firms and their members often define these
                    practices.
                  </p>
                  <ul>
                    <li>
                      <Link to="/">
                        <i className="ti-facebook"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="ti-twitter-alt"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="ti-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="ti-google"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="widget tp-service-link-widget">
                  <div className="widget-title">
                    <h3>Contact</h3>
                  </div>
                  <div className="contact-ft">
                    <ul>
                      <li>
                        <i className="fi flaticon-pin"></i> KAVTHA RAILWAY,
                        KAVTHA, TA DEOLI WARDHA, MAHARASHTRA, 442302
                      </li>
                      <li>
                        <i className="fi flaticon-call"></i>+91 9322168327
                      </li>
                      <li>
                        <i className="fi flaticon-envelope"></i>{" "}
                        sahilpardakee180@gmail.com
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="widget link-widget">
                  <div className="widget-title">
                    <h3>My Account</h3>
                  </div>
                  <ul>
                    <li>
                      <Link onClick={ClickHandler} to="/project">
                        Our Projects
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to="/shop">
                        Our Shop
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to="/wishlist">
                        Wishlist
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to="/checkout">
                        Checkout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="widget newsletter-widget">
                  <div className="widget-title">
                    <h3>Newsletter</h3>
                  </div>
                  <p>You will be notified when something new will appear.</p>
                  <form>
                    <div className="input-1">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address *"
                        required
                      />
                    </div>
                    <div className="submit clearfix">
                      <button type="submit">
                        <i className="ti-email"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tp-lower-footer">
          <div className="container">
            <div className="row">
              <div className="col col-xs-12">
                <p className="copyright">
                  Copyright © 2025 Chia Seeds by{" "}
                  <Link onClick={ClickHandler} to="/">
                    themepresss
                  </Link>
                  . All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* These shapes are hidden by the CSS above */}
        <div className="footer-shape1">
          <i className="fi flaticon-honeycomb"></i>
        </div>
        <div className="footer-shape2">
          <i className="fi flaticon-honey-1"></i>
        </div>
      </footer>
    </>
  );
};

export default Footer;
