import React, { useState } from "react";

const ThemeChanger = () => {
  const [theme, setTheme] = useState("light"); // Default theme
  const [icon, setIcon] = useState("🌞"); // Default icon

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      setIcon("🌙");
      // Change CSS variables for dark theme
      document.documentElement.style.setProperty(
        "--background-color",
        "#333333"
      );
      document.documentElement.style.setProperty("--text-color", "#ffffff");
      document.documentElement.style.setProperty("--button-bg", "#007bff");
    } else {
      setTheme("light");
      setIcon("🌞");
      // Change CSS variables for light theme
      document.documentElement.style.setProperty(
        "--background-color",
        "#ffffff"
      );
      document.documentElement.style.setProperty("--text-color", "#000000");
      document.documentElement.style.setProperty("--button-bg", "#ffcc00");
    }
  };

  const changeFont = (newFont) => {
    // Change CSS variable for font-family
    document.documentElement.style.setProperty("--font-family", newFont);
  };

  return (
    <div className="theme-container">
      <h1>Dynamic Theme</h1>
      <button onClick={toggleTheme}>{icon}</button>
      <br />
      <label>Select Font:</label>
      <select onChange={(e) => changeFont(e.target.value)}>
        <option value="'Arial', sans-serif">Arial</option>
        <option value="'Courier New', monospace">Courier New</option>
        <option value="'Georgia', serif">Georgia</option>
        <option value="'Roboto', sans-serif">Roboto</option>
      </select>
    </div>
  );
};

export default ThemeChanger;
