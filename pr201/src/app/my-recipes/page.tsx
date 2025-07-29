'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './MyRecipes.css';

interface Recipe {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function MyRecipes() {
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
        setError('Failed to load recipes. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="my-recipes-container">
      <div className="header">
        <h1>My Saved Recipes</h1>
        <Link href="/" className="back-to-home">
          Back to Home
        </Link>
      </div>

      {loading ? (
        <div className="loading">Loading your recipes...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : recipes.length === 0 ? (
        <div className="no-recipes">
          <p>You haven't saved any recipes yet.</p>
          <button onClick={() => router.push('/')} className="find-recipes-button">
            Find Recipes to Save
          </button>
        </div>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p className="description">{recipe.description}</p>
              <div className="recipe-footer">
                <span className="date">Saved on {formatDate(recipe.createdAt)}</span>
                <button 
                  onClick={() => router.push(`/recipe-details/${recipe.id}`)}
                  className="view-recipe-button"
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
