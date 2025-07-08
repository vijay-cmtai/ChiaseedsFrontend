import React, { useState } from "react";
// Step 1: Image imports ko hata diya gaya hai, kyunki ab humein inki zaroorat nahi hai.
// import serviceimg from "../../images/support/1.png";
// import serviceimg2 from "../../images/support/2.png";
// import serviceimg3 from "../../images/support/3.png";

// --- Consistent Color Palette ---
const colors = {
  primary: "#878fba",
  primaryHover: "#6c749d",
  textDark: "#3d2b56",
  textMuted: "#5a506b",
  textLight: "#ffffff",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
};

// --- Style Objects ---
const styles = {
  serviceArea: {
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
    padding: "80px 0",
  },
  serviceItemBase: {
    display: "flex",
    alignItems: "center",
    padding: "25px",
    background: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    cursor: "pointer",
  },
  serviceItemHover: {
    transform: "translateY(-8px)",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.15)",
    background: "rgba(255, 255, 255, 0.7)",
  },
  iconWrapper: {
    width: "70px",
    height: "70px",
    minWidth: "70px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.textLight,
    borderRadius: "50%",
    marginRight: "20px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
  },
  // Step 2: iconImage style ko iconFont style se replace kiya gaya hai
  iconFont: {
    fontSize: "30px", // Icon ka size
    color: colors.primary, // Icon ka color
  },
  textTitle: {
    color: colors.textDark,
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 4px 0",
  },
  textSubtitle: {
    color: colors.textMuted,
    fontSize: "15px",
  },
};

const Service = () => {
  // Step 3: Data array ko Font Awesome class names ke saath update kiya gaya hai
  const services = [
    {
      icon: "fa fa-truck",
      title: "Free Shipping",
      subtitle: "Order Over $560",
    },
    {
      icon: "fa fa-shield-alt",
      title: "Easy Payment",
      subtitle: "100% Secure Payment",
    },
    {
      icon: "fa fa-headset",
      title: "24/7 Support",
      subtitle: "Any time Support",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={styles.serviceArea}>
      <div className="container">
        <div className="row">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const itemStyle = isHovered
              ? { ...styles.serviceItemBase, ...styles.serviceItemHover }
              : styles.serviceItemBase;

            return (
              <div
                className="col-lg-4 col-md-6 col-sm-12 col-12 mb-4"
                key={index}
              >
                <div
                  style={itemStyle}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div style={styles.iconWrapper}>
                    {/* Step 4: <img> tag ko <i> tag se replace kiya gaya hai */}
                    <i className={service.icon} style={styles.iconFont}></i>
                  </div>
                  <div className="service-icon-text">
                    <h2 style={styles.textTitle}>{service.title}</h2>
                    <span style={styles.textSubtitle}>{service.subtitle}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Service;
