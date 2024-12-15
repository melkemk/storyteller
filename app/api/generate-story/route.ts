import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
console.log(process.env.gemini,'enviroment');

// Initialize Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(process.env.gemini || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Define POST handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { theme, genre, characters } = body;

    if (!theme || !genre || !characters) {
      return NextResponse.json(
        { message: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Construct the prompt
    const prompt = `
      Create a captivating story based on the following:
      Theme: ${theme}
      Genre: ${genre}
      Characters: ${characters}.
      The story should be engaging and fit the specified genre.
      Use creative and descriptive language to bring the characters to life.
      importent:Do not write a story that exceeds 200 words in length.
    `;

    const settings = {
      temperature: 0.7,
      maxTokens: 500,
      topP: 0.9,
      frequencyPenalty: 0.2,
      presencePenalty: 0.3,
    };

    const response = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: settings.temperature,
        maxOutputTokens: settings.maxTokens,
        topP: settings.topP,
        topK: 40,
      },
    });

    const story = response?.response?.text() || '';
    console.log(story,'story');
    if (!story) {
      return NextResponse.json(
        { message: 'Failed to generate the story.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ story }, { status: 200 });
  } catch (error) {
    console.error('Error generating story:', error);
    return NextResponse.json(
      { message: 'Error generating story. Please try again.' },
      { status: 500 }
    );
  }
}
