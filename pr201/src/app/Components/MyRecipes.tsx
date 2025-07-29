'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './MyRecipes.css';

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  imageUrl: string;
  createdAt: string;
}

const MyRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/save-recipe');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError('Failed to load recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const viewRecipe = (recipe: Recipe) => {
    localStorage.setItem('selectedRecipe', JSON.stringify({
      title: recipe.title,
      description: recipe.description,
      ingredients: JSON.parse(recipe.ingredients),
      instructions: JSON.parse(recipe.instructions),
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      imageUrl: recipe.imageUrl
    }));
    router.push('/recipe-details');
  };

  if (loading) {
    return <div className="loading">Loading your recipes...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (recipes.length === 0) {
    return <div className="no-recipes">No saved recipes yet. Generate and save some recipes to see them here!</div>;
  }

  return (
    <div className="my-recipes-grid">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-card">
          <div className="recipe-card-content">
            <h3>{recipe.title}</h3>
            <p className="recipe-description">{recipe.description}</p>
            <div className="recipe-meta">
              <span>Prep: {recipe.prepTime} min</span>
              <span>Cook: {recipe.cookTime} min</span>
              <span>Servings: {recipe.servings}</span>
              <span>Difficulty: {recipe.difficulty}</span>
            </div>
            <button 
              className="view-recipe-button"
              onClick={() => viewRecipe(recipe)}
            >
              View Recipe
            </button>
          </div>
          {recipe.imageUrl && (
            <div className="recipe-image">
              <img src={recipe.imageUrl} alt={recipe.title} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyRecipes;
