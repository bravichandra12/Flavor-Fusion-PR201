"use client";

import React, { useState } from "react";
import "./MealPlanner.css";

const MealPlanner = () => {
  const [recipeInput, setRecipeInput] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState('');
  const [showRecipePage, setShowRecipePage] = useState(false);
  const [loading, setLoading] = useState(false);
  const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;
  const GROQ_MODEL = "llama3-70b-8192";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeInput(event.target.value);
  };

  const handleGenerateClick = async () => {
    if (!recipeInput.trim()) {
      alert('Please enter a recipe idea!');
      return;
    }

    setLoading(true);
    try {
      const generatedRecipeText = await callGroqApi(recipeInput);
      setGeneratedRecipe(generatedRecipeText);
      setShowRecipePage(true);
    } catch (error) {
      console.error('Error generating recipe:', error);
      setGeneratedRecipe('Error generating recipe. Please try again.');
      setShowRecipePage(true);
    } finally {
      setLoading(false);
    }
  };

  const callGroqApi = async (prompt: string): Promise<string> => {
    prompt = `Give me three distinct Indian recipe names as diet plan for a week for ${prompt} with detailed ingredients and detailed instructions with proper timings and number of servings, without any starting or ending texts,end every recipe with ||  and with good styling with a line and more spacing between each recipe and some big font.`
    const url = "https://api.groq.com/openai/v1/chat/completions";
    const headers = {
      "Authorization": `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    };
    const data = {
      "model": GROQ_MODEL,
      "messages": [
        {
          "role": "user",
          "content": prompt,
        },
      ],
      "max_tokens": 2048,
      "temperature": 0.7,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.choices[0].message.content;
  };

  const handleBackToInput = () => {
    setShowRecipePage(false);
    setGeneratedRecipe('');
    setRecipeInput('');
  };

  if (showRecipePage) {
    return (
      <div className="meal-planner-container">
        <div className="recipe-display">
          <button className="back-button" onClick={handleBackToInput}>
            ← Back to Meal Planner
          </button>
          <div className="recipe-content">
            <h2>Your Generated Recipes</h2>
            <div className="recipe-text">
              {generatedRecipe.split('||').map((recipe, index) => (
                <div key={index} className="recipe-item">
                  {recipe.trim() && (
                    <div dangerouslySetInnerHTML={{ __html: recipe.replace(/\n/g, '<br>') }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="meal-planner-container">
      <div className="meal-planner-header">
        <h1>Meal Planner</h1>
        <p>Plan your meals with AI-generated recipes tailored to your preferences</p>
      </div>
      
      <div className="meal-planner-content">
        <div className="input-section">
          <h2>What would you like to cook?</h2>
          <p>Enter ingredients, cuisine type, dietary preferences, or any recipe idea</p>
          
          <div className="input-container">
            <input
              type="text"
              className="recipe-input"
              placeholder="e.g., vegetarian pasta with tomatoes, quick breakfast ideas, gluten-free dessert..."
              value={recipeInput}
              onChange={handleInputChange}
            />
            <button 
              className="generate-button" 
              onClick={handleGenerateClick} 
              disabled={loading}
            >
              {loading ? "Generating..." : <b>Generate Recipes</b>}
            </button>
          </div>
        </div>

        <div className="meal-planner-features">
          <h3>Meal Planning Features</h3>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">📅</span>
              <h4>Weekly Planning</h4>
              <p>Plan your meals for the entire week with AI suggestions</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🥗</span>
              <h4>Dietary Preferences</h4>
              <p>Get recipes that match your dietary restrictions and preferences</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🛒</span>
              <h4>Shopping Lists</h4>
              <p>Automatically generate shopping lists from your meal plans</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">⏰</span>
              <h4>Time Management</h4>
              <p>Find recipes that fit your available cooking time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;
