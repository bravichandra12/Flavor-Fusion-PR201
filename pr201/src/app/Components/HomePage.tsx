"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "./HomePage.css"; // Import CSS for styling
import logo from "../Assets/Logo.png";
import google from "../Assets/google-logo.png"; // Adjust the path if needed
import hamburger from "../Assets/hamburger.jpeg";
import pancakes from "../Assets/pancakes.jpeg";
import chia_pudding from "../Assets/pudding.jpeg";
import yogurt_dip from "../Assets/yogurt.jpeg";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import Footer from "./Footer";
import IdentityServer4 from "next-auth/providers/identity-server4";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image"; // Import Image from next/image
import Link from "next/link";
import Recipes from "./Recipes"; // Import from project2
import RecipeDetails from "./RecipeDetails"; // Import from project2

const icons = [
  "🍅", "🥕", "🥦", "🌶️", "🌽", "🍇", "🍓", "🍍", "🍏","🍌", "🍐",
   "🍊", "🍋", "🍉", "🥑", "🍄", "🧅", "🧄", "🥬",
];

const HomePage = () => {
  const router = useRouter();
  const goToTopRef = useRef(null);
  const [recipeInput, setRecipeInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const handleLoginClick = () => setIsLoginPopupOpen(true);
  const handleClosePopup = () => setIsLoginPopupOpen(false);

  const [currentIcon, setCurrentIcon] = useState(icons[0]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * icons.length);
      setCurrentIcon(icons[randomIndex]);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const { data: session } = useSession();
  const [profileurl, setprofileurl] = useState<string>("");
  useEffect(() => {
    if(session && session.user) {
      setprofileurl(session.user?.image!);
    }
  }, [session]);

  const [isFAQOpen, setIsFAQOpen] = useState<Record<string, boolean>>({});
  const toggleFAQ = (question: string) => {
    setIsFAQOpen((prevOpen) => ({
      ...prevOpen,
      [question]: !prevOpen[question],
    }));
  };

  const handleGenerateClick = async () => {
    if (!recipeInput.trim()) {
      alert('Please enter a recipe idea!');
      return;
    }

    setLoading(true);
    try {
      router.push(`/recipes?name=${encodeURIComponent(recipeInput)}`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="home-page">
      <header className="home-header">
        <div className="logo">
          <Image src={logo} alt="Flavor Fusion Logo" height={50} />
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/main"><h2 id="heading">Flavor Fusion</h2></Link>
              
            </li>
            <li>
              <a href="#">Recipe Generator</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            
          </ul>
         
        </nav>
        <div className="auth-buttons">
        {session?.user?.image && (
          <Link href={"/profile"}>
        <Image
          src={session.user.image}
          alt="User Profile"
          width={30}
          height={30}
        className="rounded-lg"
        />
        </Link>
        )}

        {!session?.user ?
        (<div><button
        className="login-button"
        onClick={()=>{
          setIsLoginPopupOpen(true);
        }}
        >
        Login
        </button>
        <button className="signin-button">Sign Up</button></div>):
        <button
        className="login-button"
        onClick={() => signOut( { callbackUrl: "/" })}
        >
        Logout
        </button>
        }
          
        </div>
      </header>

      {isLoginPopupOpen && (
        <div className="login-popup">
          <div className="popup-content">
            <h1>Log In</h1>
            <p>Happy to see you!</p>
            <button
              className="google-login-button"
              onClick={() => signIn("google",{callbackUrl: "/main"})}
            >
              <Image src={google} alt="Google Logo" height={12} />
              Log in with Google
            </button>
            <h2>OR</h2>
            <div className="email-login-form">
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Log In</button>
            </div>
            <p>Why do I need an account?</p>
            <p>
              By registering, you agree to our{" "}
              <a href="/">Privacy Policy</a> and <a href="/">Terms of Use</a>
            </p>
          </div>
          <button className="close-popup" onClick={handleClosePopup}>
            &times;
          </button>
        </div>
      )}

      <main className="main-content">
        <div className="icon-container">
          <h1>{currentIcon}</h1>
        </div>
        <h1>Your perfect recipe in seconds.</h1>
        <p>
          The best AI recipe generator. Enter ingredients and get recipes with
          our cooking AI.
        </p>
        <div className="home-page">
      <div className="input-section">
          <input
        type="text"
        placeholder="Enter recipe idea or ingredients..."
        className="recipe-input"
        value={recipeInput}
        onChange={(e) => setRecipeInput(e.target.value)}
      />
      <button 
        className="generate-button" 
        onClick={handleGenerateClick} 
        disabled={loading}
      >
        {loading ? "Generating..." : <b>Generate</b>}
      </button>
        </div>
      </div>

        <blockquote>
          <p>
            An amazing app with usage of AI for anyone to create and maintain
            easy cooking at home.
          </p>
          <div className="reviews">
            <span>&#9733; &#9733; &#9733; &#9733; &#9733;</span>
            <p>Loved by 5 cooks worldwide</p>
          </div>
        </blockquote>
      </main>

      <div className="recipe-grid">
        {[hamburger, pancakes, chia_pudding, yogurt_dip].map((img, idx) => (
          <div className="recipe-card" key={idx}>
            <Image
              src={img}
              alt={`Recipe ${idx + 1}`}
              width={300}
              height={200}
            />
            <h3>Sample Recipe {idx + 1}</h3>
          </div>
        ))}
      </div>

      <button
        className="go-to-top"
        onClick={scrollToTop}
        ref={goToTopRef}
      >
        ↑
      </button>
      <div className="mobile-app-preview">
        <h2>AI Recipe Generator</h2>
        <ul>
          <li><span className="green-dot">&#9679;</span>Create recipes based on your preferences.</li>
          <li><span className="green-dot">&#9679;</span>Turn your leftovers into delicious meals.</li>
          <li><span className="green-dot">&#9679;</span>Take photos of ingredients and get matching recipes.</li>
          <li><span className="green-dot">&#9679;</span>Save your preferences and allergies.</li>
        </ul>
        <a href="http://localhost:8501" target="_blank" rel="noopener noreferrer">
          <button className="find-ingredient-button">FIND INGREDIENT</button>
        </a>

      </div>
      <section className="how-it-works">
          <h2>How does it work?</h2>
          <p>Flavor Fusion uses artificial intelligence to generate recipes based on your input.</p>
          <div className="steps-container">
            <div className="step">
              <span className="step-number">✍️</span>
              <h3>1. Enter a prompt</h3>
              <p>Enter a recipe idea you've always wanted to try and Flavor Fusion will create a recipe for you.</p>
              <p>You can also enter a list of ingredients you would like to use. Perfect to create a leftover recipe!</p>
              <p>You can also enter your personal preferences such as vegetarian, vegan, gluten-free, lactose-free, etc.</p>
            </div>
            <div className="step">
              <span className="step-number">✨</span>
              <h3>2. Generate a recipe</h3>
              <p>An artificial intelligence is used to create the recipe for you. It only takes a few seconds.</p>
              <p>The recipe will be based on the prompt you enter.</p>
            </div>
            <div className="step">
              <span className="step-number">😋</span>
              <h3>3. Enjoy your meal !</h3>
              <p>You can then cook the recipe and enjoy your meal.</p>
              <p>The recipe will be saved in your cookbook. You can easily share the recipe with your friends and family.</p>
            </div>
          </div>
        </section>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <ul>
          {["What is Flavor Fusion?", "How much does it cost?","How do I get started?","How do I import a recipe?"].map((q) => (
            <li key={q}>
              <h3>{q}</h3>
              <span onClick={() => toggleFAQ(q)}>
                {isFAQOpen[q] ? <FaCaretUp /> : <FaCaretDown />}
              </span>
              {isFAQOpen[q] && <p>Answer for {q}</p>}
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
