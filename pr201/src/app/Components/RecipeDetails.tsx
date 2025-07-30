// components/RecipeDetails.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import './RecipeDetails.css';

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  imageUrl?: string;
  createdAt?: string;
}

interface RecipeDetailsProps {
  recipe: Recipe | null;
  loading?: boolean;
  error?: string;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe, loading = false, error = '' }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState('');
  const { data: session } = useSession();

  const handleBack = () => {
    router.push('/my-recipes');
  };

  const handleSaveRecipe = async () => {
    if (isSaving || isSaved) return;
    
    setIsSaving(true);
    setSaveError('');
    
    try {
      if (!session?.user?.id) {
        throw new Error('You must be logged in to save recipes');
      }

      const response = await fetch('/api/save-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          ingredients: JSON.stringify(ingredients),
          instructions: JSON.stringify(instructions),
          prepTime,
          cookTime,
          servings,
          difficulty,
          imageUrl: imageUrl || '',
          userId: session.user.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save recipe');
      }

      setIsSaved(true);
    } catch (err) {
      console.error('Error saving recipe:', err);
      setSaveError('Failed to save recipe. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="recipe-details-container">
        <div className="loading">Loading recipe details...</div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="recipe-details-container">
        <div className="error-message">{error}</div>
        <button 
          onClick={handleBack}
          className="back-button"
        >
          ← Back to Recipes
        </button>
      </div>
    );
  }

  // Handle case when recipe is not found or not loaded yet
  if (!recipe) {
    return (
      <div className="recipe-details-container">
        <div className="error-message">Recipe not found or failed to load</div>
        <button 
          onClick={handleBack}
          className="back-button"
        >
          ← Back to Recipes
        </button>
      </div>
    );
  }

  // Destructure with defaults
  const { 
    title = 'Untitled Recipe',
    description = 'No description available',
    ingredients = [],
    instructions = [],
    prepTime = 0,
    cookTime = 0,
    servings = 0,
    difficulty = 'Not specified',
    imageUrl = ''
  } = recipe;

  // Handle loading state
  if (loading) {
    return (
      <div className="recipe-details-container">
        <div className="loading">Loading recipe details...</div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="recipe-details-container">
        <div className="error-message">{error}</div>
        <button 
          onClick={handleBack}
          className="back-button"
        >
          ← Back to Recipes
        </button>
      </div>
    );
  }

  // Handle case when recipe is not found or not loaded yet
  if (!recipe) {
    return (
      <div className="recipe-details-container">
        <div className="error-message">Recipe not found or failed to load</div>
        <button 
          onClick={handleBack}
          className="back-button"
        >
          ← Back to Recipes
        </button>
      </div>
    );
  }

  return (
    <div className="recipe-details-container">
      <div className="button-group">
        <button 
          onClick={handleBack}
          className="back-button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          ← Back to {isHovered ? 'Recipes' : ''}
        </button>
        <button 
          className={`save-recipe-button ${isSaved ? 'saved' : ''}`}
          onClick={handleSaveRecipe}
          disabled={isSaving || isSaved}
        >
          {isSaved ? 'Recipe Saved!' : isSaving ? 'Saving...' : 'Save Recipe'}
        </button>
      </div>
      
      {saveError && <div className="error-message">{saveError}</div>}
      
      <h2 className="recipe-details-title">{title}</h2>
      
      {imageUrl && (
        <div className="recipe-image">
          <img 
            src={imageUrl} 
            alt={title} 
            className="recipe-image"
            onError={(e) => {
              // Hide the image if it fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}
      
      <div className="recipe-content">
        <div className="recipe-section">
          <h3>Description</h3>
          <p className="recipe-description">{description}</p>
        </div>
        
        <div className="recipe-section">
          <h3>Ingredients</h3>
          <ul className="ingredients-list">
            {ingredients.length > 0 ? (
              ingredients.map((ingredient, idx) => (
                <li key={idx} className="ingredient-item">
                  {ingredient}
                </li>
              ))
            ) : (
              <li>No ingredients listed</li>
            )}
          </ul>
        </div>
        
        <div className="recipe-section">
          <h3>Instructions</h3>
          <ol className="instructions-list">
            {instructions.length > 0 ? (
              instructions.map((instruction, idx) => (
                <li key={idx} className="instruction-step">
                  {instruction}
                </li>
              ))
            ) : (
              <li>No instructions provided</li>
            )}
          </ol>
        </div>
        
        <div className="recipe-meta">
          <div className="meta-item">
            <span className="meta-label">Prep Time:</span>
            <span className="meta-value">{prepTime} minutes</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Cook Time:</span>
            <span className="meta-value">{cookTime} minutes</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Servings:</span>
            <span className="meta-value">{servings}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Difficulty:</span>
            <span className="meta-value">{difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;