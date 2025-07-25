import React from 'react';
import logo from '../Assets/Logo.png';
import './Footer.css';

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-container">
          <div className="logo-container">
            {/* <img src={logo} alt="Mr. Cook Logo" height={50}/> */} <h2>Flavor Fusion</h2> 
            <p>Fusion Flavor is a web app for anyone who loves to cook. It allows you to organize your recipes, share them with others, plan meals and create shopping lists. The goal is to make cooking easier, faster and more fun.</p>
          </div>
          <div className="footer-links">
            <h3>About Us</h3>
            <ul>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Updates</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h3>Tools</h3>
            <ul>
              <li><a href="#">Recipe Generator</a></li>
              <li><a href="#">Recipe Scanner</a></li>
              <li><a href="#">Nutrition AI</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h3>Features</h3>
            <ul>
              <li><a href="#">Mobile App</a></li>
              <li><a href="#">Meal Planner</a></li>
              <li><a href="#">Cookbooks</a></li>
            </ul>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;