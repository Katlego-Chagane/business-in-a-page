import { openai } from '@/lib/openai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, prompt } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a business model canvas expert. Create a detailed Business Model Canvas with exactly 4 concise, specific points for each section. Return ONLY a valid JSON object with this exact structure:
          {
            "keyPartners": ["point1", "point2", "point3", "point4"],
            "keyActivities": ["point1", "point2", "point3", "point4"],
            "keyResources": ["point1", "point2", "point3", "point4"],
            "valuePropositions": ["point1", "point2", "point3", "point4"],
            "customerRelationships": ["point1", "point2", "point3", "point4"],
            "customerSegments": ["point1", "point2", "point3", "point4"],
            "channels": ["point1", "point2", "point3", "point4"],
            "costStructure": ["point1", "point2", "point3", "point4"],
            "revenueStreams": ["point1", "point2", "point3", "point4"]
          }
          Keep each point brief, specific, and directly related to the business. Do not include numbering or bullet points in the text.`
        },
        {
          role: "user",
          content: `Create a Business Model Canvas for this business idea: ${prompt}`
        }
      ],
      temperature: 0.7,
    });

    let canvasData;
    try {
      canvasData = JSON.parse(completion.choices[0].message.content);
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      throw new Error('Invalid AI response format');
    }

    // Validate the response structure
    const requiredFields = [
      'keyPartners', 'keyActivities', 'keyResources', 'valuePropositions',
      'customerRelationships', 'customerSegments', 'channels',
      'costStructure', 'revenueStreams'
    ];

    for (const field of requiredFields) {
      if (!Array.isArray(canvasData[field])) {
        canvasData[field] = [];
      }
    }

    return NextResponse.json({
      name,
      generated: new Date().toISOString(),
      ...canvasData
    });
  } catch (error) {
    console.error('Canvas generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate canvas' },
      { status: 500 }
    );
  }
} 