import React from "react";

// --- Data (moved inside for clarity) ---
const prices = [
  { id: 1, min: 50, max: 100 },
  { id: 2, min: 100, max: 200 },
  { id: 3, min: 200, max: null },
];
const sizes = ["small", "medium", "large"];
const colorsData = ["ffffff", "3d2b56", "878fba", "cf1105"];
const brands = ["Chia Co", "Nutiva", "Navitas", "Spectrum"];

// --- Color Palette (Matching your theme) ---
const colors = {
  primaryButton: "#878fba",
  textDark: "#3d2b56",
  textLight: "#ffffff",
  cardBackground: "rgba(255, 255, 255, 0.7)",
  borderColor: "rgba(135, 143, 186, 0.2)",
};

// --- Styles ---
const styles = {
  sidebarWrapper: {
    padding: "30px",
    backgroundColor: colors.cardBackground,
    borderRadius: "20px",
    border: `1px solid ${colors.borderColor}`,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
  },
  filterSection: {
    marginBottom: "35px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    color: colors.textDark,
    paddingBottom: "10px",
    marginBottom: "20px",
    borderBottom: `2px solid ${colors.borderColor}`,
  },
  searchContainer: {
    position: "relative",
  },
  searchInput: {
    width: "100%",
    height: "50px",
    padding: "10px 55px 10px 20px",
    border: `1px solid ${colors.borderColor}`,
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    color: colors.textDark,
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  searchButton: {
    position: "absolute",
    right: "5px",
    top: "5px",
    width: "40px",
    height: "40px",
    backgroundColor: colors.primaryButton,
    color: colors.textLight,
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: "12px",
  },
  // Custom Radio Button Styles
  label: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "16px",
    color: colors.textDark,
  },
  input: {
    display: "none", // Hide the default radio button
  },
  customRadio: {
    width: "20px",
    height: "20px",
    border: `2px solid ${colors.primaryButton}`,
    borderRadius: "50%",
    marginRight: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s ease, border-color 0.3s ease",
  },
  customRadioInner: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: colors.primaryButton,
    transform: "scale(0)",
    transition: "transform 0.2s ease",
  },
  // Color Swatch Styles
  colorList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },
  colorLabel: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    cursor: "pointer",
    border: "2px solid transparent",
    transition: "border-color 0.3s ease, transform 0.2s ease",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.1) inset",
  },
  colorLabelActive: {
    borderColor: colors.primaryButton,
    transform: "scale(1.1)",
  },
};

const FilterSidebar = ({ filter, changeHandler, priceChangeHandler }) => {
  return (
    <div className="col-lg-4">
      <div style={styles.sidebarWrapper}>
        {/* Search Section */}
        <div style={styles.filterSection}>
          <h2 style={styles.title}>Search</h2>
          <div style={styles.searchContainer}>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                style={styles.searchInput}
                placeholder="Search products..."
              />
              <button type="submit" style={styles.searchButton}>
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
        </div>

        {/* Price Section */}
        <div style={styles.filterSection}>
          <h2 style={styles.title}>Price</h2>
          <ul style={styles.list}>
            {/* All Prices Option */}
            <li style={styles.listItem}>
              <label style={styles.label}>
                <input
                  style={styles.input}
                  type="radio"
                  value={""}
                  checked={!filter.price}
                  name="price"
                  onChange={changeHandler}
                />
                <span style={styles.customRadio}>
                  <span
                    style={{
                      ...styles.customRadioInner,
                      transform: !filter.price ? "scale(1)" : "scale(0)",
                    }}
                  ></span>
                </span>
                All Prices
              </label>
            </li>
            {/* Mapped Prices */}
            {prices.map((price) => (
              <li key={price.id} style={styles.listItem}>
                <label style={styles.label}>
                  <input
                    style={styles.input}
                    type="radio"
                    value={JSON.stringify(price)}
                    checked={filter.price.id === price.id}
                    onChange={priceChangeHandler}
                    name="price"
                  />
                  <span style={styles.customRadio}>
                    <span
                      style={{
                        ...styles.customRadioInner,
                        transform:
                          filter.price.id === price.id
                            ? "scale(1)"
                            : "scale(0)",
                      }}
                    ></span>
                  </span>
                  ${price.min} {price.max ? `- $${price.max}` : "and more"}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Color Section */}
        <div style={styles.filterSection}>
          <h2 style={styles.title}>Color</h2>
          <ul style={styles.colorList}>
            {colorsData.map((color) => {
              const isActive = filter.color === color;
              const labelStyle = {
                ...styles.colorLabel,
                background: `#${color}`,
                ...(isActive && styles.colorLabelActive),
              };
              return (
                <li key={color}>
                  <input
                    style={styles.input}
                    id={color}
                    type="radio"
                    name="color"
                    value={color}
                    onChange={changeHandler}
                  />
                  <label htmlFor={color} style={labelStyle}></label>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Brand Section (Add more sections like Size here, following the same pattern) */}
        <div style={styles.filterSection}>
          <h2 style={styles.title}>Brand</h2>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <label style={styles.label}>
                <input
                  style={styles.input}
                  type="radio"
                  value=""
                  checked={filter.brand === ""}
                  onChange={changeHandler}
                  name="brand"
                />
                <span style={styles.customRadio}>
                  <span
                    style={{
                      ...styles.customRadioInner,
                      transform: filter.brand === "" ? "scale(1)" : "scale(0)",
                    }}
                  ></span>
                </span>
                All Brands
              </label>
            </li>
            {brands.map((brand) => (
              <li key={brand} style={styles.listItem}>
                <label style={styles.label}>
                  <input
                    style={styles.input}
                    type="radio"
                    value={brand}
                    checked={filter.brand === brand}
                    onChange={changeHandler}
                    name="brand"
                  />
                  <span style={styles.customRadio}>
                    <span
                      style={{
                        ...styles.customRadioInner,
                        transform:
                          filter.brand === brand ? "scale(1)" : "scale(0)",
                      }}
                    ></span>
                  </span>
                  {brand}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
