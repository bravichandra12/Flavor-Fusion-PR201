"use client";

import HomePage from '../app/Components/HomePage';
import Recipes from '../app/Components/Recipes';
import RecipeDetails from '../app/Components/RecipeDetails';
import { useSearchParams } from 'next/navigation';


const page=() => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  
  if (page === 'recipes') {
    return <Recipes />;
  }
  
  if (page === 'recipe-details') {
    return <RecipeDetails />;
  }
  
  return <HomePage />;
}

export default page