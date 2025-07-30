'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import RecipeDetails from '../../Components/RecipeDetails';

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
  imageUrl: string;
  createdAt: string;
}

export default function RecipeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    
    const fetchRecipe = async () => {
      const recipeId = Array.isArray(params.id) ? params.id[0] : params.id;
      
      if (!recipeId) {
        setError('Recipe ID is missing');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/recipes/${recipeId}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to fetch recipe');
        }
        
        const data = await response.json();
        
        if (isMounted) {
          setRecipe(data);
          setError('');
        }
      } catch (err) {
        console.error('Error fetching recipe:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load recipe. Please try again later.');
          setRecipe(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRecipe();
    
    return () => {
      isMounted = false;
    };
  }, [params.id]);

  return (
    <RecipeDetails 
      recipe={recipe}
      loading={loading}
      error={error}
    />
  );
}
