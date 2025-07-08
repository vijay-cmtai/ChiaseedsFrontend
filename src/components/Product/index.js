import React, { useState } from "react";

// Data for the health benefits (koi badlav nahi)
const benefitsList = [
  {
    icon: "fa fa-brain",
    title: "Supports Brain Health",
    text: "Rich in natural compounds that aid cognitive function and mental clarity.",
  },
  {
    icon: "fa fa-leaf",
    title: "High in Fiber",
    text: "A natural source of dietary fiber that supports a healthy digestive system.",
  },
  {
    icon: "fa fa-shield-alt",
    title: "Packed with Antioxidants",
    text: "Helps protect your body from cell damage caused by free radicals.",
  },
  {
    icon: "fa fa-bone",
    title: "Source of Calcium",
    text: "Contains essential minerals that are crucial for maintaining strong bones.",
  },
];

// --- STYLES (Hero section ke theme se match karne ke liye) ---

// Consistent color palette
const colors = {
  primary: "#878fba", // Primary button/accent color
  textDark: "#3d2b56", // Dark purple for text
  textMuted: "#6c757d",
  gradientStart: "#fde7c9", // Creamy Yellow/Peach
  gradientEnd: "#e0c3fc", // Lavender
};

const sectionStyle = {
  // === YAHAN BADLAV KIYA GAYA HAI ===
  background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
  padding: "80px 0", // Consistent padding
};

const sectionTitleStyle = {
  textAlign: "center",
  marginBottom: "20px",
};

const h2Style = {
  fontSize: "40px",
  fontWeight: "700",
  marginBottom: "15px",
  color: colors.textDark, // Dark text for readability
};

const spanStyle = {
  color: colors.primary, // Using the primary color for the span
};

const sectionParagraphStyle = {
  color: colors.textMuted,
  fontSize: "18px",
  lineHeight: 1.7,
};

const benefitItemBaseStyle = {
  textAlign: "center",
  padding: "30px 20px",
  marginBottom: "30px",
  borderRadius: "15px", // Thode aur rounded corners
  transition: "all 0.3s ease-in-out",
  // === NAYA "FROSTED GLASS" EFFECT ===
  backgroundColor: "rgba(255, 255, 255, 0.4)", // Semi-transparent white
  backdropFilter: "blur(10px)", // Blur effect peeche ke background par
  border: "1px solid rgba(255, 255, 255, 0.2)", // Bahut halki si border
};

const benefitItemHoverStyle = {
  transform: "translateY(-10px)",
  boxShadow: "0 15px 40px rgba(0, 0, 0, 0.1)", // Thodi gehri shadow hover par
};

const benefitIconStyle = {
  fontSize: "48px",
  color: colors.primary, // Icon ka color primary rakha
  marginBottom: "25px",
  display: "inline-block",
};

const benefitTitleStyle = {
  fontSize: "22px",
  fontWeight: "600",
  marginBottom: "12px",
  color: colors.textDark, // Dark text for title
};

const benefitTextStyle = {
  fontSize: "16px",
  lineHeight: 1.6,
  color: colors.textMuted,
};

const HealthBenefits = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    // Main section par naya background style apply kiya gaya hai
    <section className="health-benefits-area" style={sectionStyle}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div style={sectionTitleStyle}>
              <h2 style={h2Style}>
                Full Body <span style={spanStyle}>Health Benefits</span>
              </h2>
              <p style={sectionParagraphStyle}>
                Our 100% fresh chia seeds are more than a healthy choice. They
                are a powerhouse of natural goodness designed to nourish your
                body from the inside out.
              </p>
            </div>
          </div>
        </div>

        <div className="benefits-wrap pt-4">
          <div className="row">
            {benefitsList.map((benefit, index) => {
              const currentItemStyle =
                hoveredIndex === index
                  ? { ...benefitItemBaseStyle, ...benefitItemHoverStyle }
                  : benefitItemBaseStyle;

              return (
                <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={index}>
                  <div
                    style={currentItemStyle}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div style={benefitIconStyle}>
                      <i className={benefit.icon}></i>
                    </div>
                    <div>
                      <h3 style={benefitTitleStyle}>{benefit.title}</h3>
                      <p style={benefitTextStyle}>{benefit.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthBenefits;
