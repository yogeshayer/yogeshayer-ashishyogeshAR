import { generateText } from "ai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    console.log("[v0] Starting plant identification...")

    // Use AI SDK with vision capabilities to identify the plant
    const { text } = await generateText({
      model: "openai/gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: 'You are a botanical expert. Analyze this image and identify the plant. Provide a JSON response with the following structure: {"name": "Common name", "scientific_name": "Scientific name", "confidence": 95, "description": "Brief description", "care": {"water": "watering needs", "light": "light requirements", "temperature": "temperature range", "soil": "soil type"}, "characteristics": ["characteristic 1", "characteristic 2", "characteristic 3"], "uses": ["use 1", "use 2"], "toxicity": "Safe/Toxic to pets/humans info"}. Only respond with valid JSON, no additional text.',
            },
            {
              type: "image",
              image: image,
            },
          ],
        },
      ],
    })

    console.log("[v0] AI response received:", text)

    // Parse the AI response
    const plantData = JSON.parse(text)

    return NextResponse.json(plantData)
  } catch (error) {
    console.error("[v0] Error identifying plant:", error)
    return NextResponse.json({ error: "Failed to identify plant. Please try again." }, { status: 500 })
  }
}
