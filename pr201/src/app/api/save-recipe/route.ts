import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define the shape of our recipe data
interface RecipeData {
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty?: string;
  imageUrl?: string;
  userId: string; // Making userId required since it's required in the schema
}

export async function POST(request: Request) {
  try {
    const recipeData: RecipeData = await request.json();
    const { 
      title, 
      description, 
      ingredients, 
      instructions, 
      prepTime, 
      cookTime, 
      servings, 
      difficulty, 
      imageUrl,
      userId 
    } = recipeData;

    // Validate required fields
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Save to database
    const recipe = await prisma.recipe.create({
      data: {
        title,
        description: description || 'Delicious recipe created with Flavor Fusion',
        ingredients: JSON.stringify(ingredients || []),
        instructions: JSON.stringify(instructions || []),
        prepTime: prepTime || 0,
        cookTime: cookTime || 0,
        servings: servings || 1,
        difficulty: difficulty || 'Medium',
        imageUrl: imageUrl || '',
        userId, // Using the userId from the request
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Error saving recipe:', error);
    return NextResponse.json(
      { 
        error: 'Failed to save recipe', 
        details: error instanceof Error ? error.message : 'Unknown error',
        ...(process.env.NODE_ENV === 'development' ? { 
          stack: error instanceof Error ? error.stack : undefined 
        } : {})
      },
      { status: 500 }
    );
  } finally {
    // Close the Prisma Client connection
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    // Fetch recipes with user data
    const recipes = await prisma.recipe.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Parse the JSON strings back to arrays
    const parsedRecipes = recipes.map((recipe: { 
      id: string;
      title: string;
      description: string | null;
      ingredients: string; // Stored as JSON string
      instructions: string; // Stored as JSON string
      prepTime: number;
      cookTime: number;
      servings: number;
      difficulty: string;
      imageUrl: string | null;
      userId: string;
      createdAt: Date;
      updatedAt: Date;
      user: {
        id: string;
        name: string | null;
        email: string | null;
      };
    }) => ({
      ...recipe,
      ingredients: JSON.parse(recipe.ingredients) as string[],
      instructions: JSON.parse(recipe.instructions) as string[]
    }));

    return NextResponse.json(parsedRecipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch recipes',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
