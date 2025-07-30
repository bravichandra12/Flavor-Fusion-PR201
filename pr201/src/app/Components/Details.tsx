// components/RecipeDetails.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import './RecipeDetails.css';

const Details = () => {
  const router = useRouter();
  const [recipe, setRecipe] = useState('Loading...');
  const [isHovered, setIsHovered] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRecipe = localStorage.getItem('selectedRecipe');
      if (storedRecipe) {
        setRecipe(storedRecipe);
      } else {
        setRecipe('No recipe found.');
      }
    }
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleSaveRecipe = async () => {
    if (isSaving || isSaved) return;
    
    setIsSaving(true);
    setError('');
    
    try {
      // Parse the recipe text to extract title, ingredients, etc.
      const lines = recipe.split('\n').filter(line => line.trim() !== '');
      const title = lines[0] || 'Untitled Recipe';
      
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
          description: 'Delicious recipe created with Flavor Fusion',
          ingredients: lines.filter(line => line.includes('-')), // Simple heuristic for ingredients
          instructions: lines,
          prepTime: 15, // Default values, can be extracted from recipe if available
          cookTime: 30,
          servings: 4,
          difficulty: 'Medium',
          userId: session.user.id, // Add the user ID from the session
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save recipe');
      }

      setIsSaved(true);
    } catch (err) {
      console.error('Error saving recipe:', err);
      setError('Failed to save recipe. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="recipe-details-container">
      <div className="button-group">
        <button
          className={`back-button ${isHovered ? 'hover' : ''}`}
          onClick={handleBack}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Back
        </button>
        <button
          className={`save-recipe-button ${isSaved ? 'saved' : ''}`}
          onClick={handleSaveRecipe}
          disabled={isSaving || isSaved}
        >
          {isSaved ? 'Recipe Saved!' : isSaving ? 'Saving...' : 'Save Recipe'}
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <h2 className="recipe-details-title">Recipe Details</h2>
      <div className="recipe-content">
        {recipe.split('\n').map((line, idx) => (
          <span key={idx}>
            {line}
            <br />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Details;