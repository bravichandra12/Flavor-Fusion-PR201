// components/Recipes.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import './Recipes.css';

const Recipes = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recipes, setRecipes] = useState<string[]>([]);
  const recipeName = searchParams.get('name');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ recipeName })
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }

        const data = await response.json();
        const recipesArr = data.recipes
          .split('||')
          .map((b: string) => b.trim())
          .filter((x: string) => x.length > 0);
          
        setRecipes(recipesArr);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch recipes');
      } finally {
        setLoading(false);
      }
    };

    if (recipeName) {
      fetchRecipes();
    }
  }, [recipeName]);

  const viewRecipe = (idx: number) => {
    localStorage.setItem('selectedRecipe', recipes[idx]);
    router.push('/recipe-details');
  };

  const saveRecipe = async (recipe: string) => {
    try {
      const response = await fetch('/api/save-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: recipe.split('\n')[0] || 'Untitled Recipe',
          description: 'Saved recipe from Flavor Fusion',
          ingredients: recipe.split('\n').filter(line => line.trim() !== '' && line.includes('-')),
          instructions: recipe.split('\n').filter(line => line.trim() !== ''),
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save recipe');
      }

      alert('Recipe saved successfully!');
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Failed to save recipe. Please try again.');
    }
  };

  return (
    <div className="recipes-container">
      <h2>Recipes for: {recipeName}</h2>
      {loading && <div>Loading recipes...</div>}
      {error && <div className="error">{error}</div>}
      
      <div className="recipes-list">
        {recipes.map((recipe, i) => (
          <div key={i} className="recipe-tile">
            <pre>{recipe}</pre>
            <div className="recipe-actions">
              <button 
                className="view-recipe-button"
                onClick={() => viewRecipe(i)}
              >
                View Recipe
              </button>
              <button 
                className="save-recipe-button"
                onClick={() => saveRecipe(recipe)}
              >
                Save Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;