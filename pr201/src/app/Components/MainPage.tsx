"use client"
import React, { useState } from "react";
import "./MainPage.css"; // Import the CSS file
import ProfilePage from "../profile/page";

const MainPage = () => {
  const [activeSection, setActiveSection] = useState("Recipes");

  const renderContent = () => {
    switch (activeSection) {
      case "Recipes":
        return <div></div>;
      case "Shopping list":
        return <div></div>;
      case "Meal planner":
        return <div></div>;
      case "Cookbooks":
        return <div></div>;
      case "Tags":
        return <div></div>;
      case "Profile":
        return <div><ProfilePage/></div>;
      case "Add recipe":
        return <div></div>;
      case "Discover":
        return <div></div>;
      case "Search users":
        return <div></div>;
      case "Onboarding":
        return <div></div>;
      default:
        return <div></div>;
    }
  };

  return (
    <div className="main-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo"></div>
          <h1 className="app-title">Flavor Fusion</h1>
        </div>
        <nav className="sidebar-nav">
          {[
            "Recipes",
            "Shopping list",
            "Meal planner",
            "Cookbooks",
            "Tags",
            "Profile",
            "Add recipe",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item)}
              className={`nav-item ${
                activeSection === item ? "active" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <h2>More</h2>
          {["Discover", "Search users", "Onboarding"].map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item)}
              className={`nav-item ${
                activeSection === item ? "active" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="promo-box">
          <p></p>
          <button className="promo-button">Start Now</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default MainPage;
