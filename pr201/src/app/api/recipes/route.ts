// app/api/recipes/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { recipeName } = await request.json();
    
    if (!recipeName) {
      return NextResponse.json(
        { error: 'Recipe name is required.' },
        { status: 400 }
      );
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    const prompt = `Generate three unique Indian recipes for: ${recipeName}. Return each recipe with detailed ingredients and steps. End each recipe with ||`;

    const groqResponse = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 2000,
          temperature: 0.7
        })
      }
    );

    if (!groqResponse.ok) {
      throw new Error('Failed to fetch from Groq API');
    }

    const data = await groqResponse.json();
    const recipesText = data.choices[0].message.content;
    
    return NextResponse.json({ recipes: recipesText });
    
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to generate recipes.' },
      { status: 500 }
    );
  }
}