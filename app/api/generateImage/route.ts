// app/api/generateImage/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

    // Get the generative model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp-image-generation",
    });

    // Generate the image
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["image", "text"],
        responseMimeType: "text/plain",
      },
    });

    // Get the response
    const response = result.response;

    // Extract the image data
    const imagePart = response.candidates?.[0].content.parts.find(
      (part: any) =>
        part.inlineData && part.inlineData.mimeType.startsWith("image/")
    );

    if (imagePart) {
      const imageData = imagePart.inlineData.data;
      const mimeType = imagePart.inlineData.mimeType;

      return NextResponse.json({
        imageData: `data:${mimeType};base64,${imageData}`,
        mimeType,
      });
    } else {
      return NextResponse.json({ text: response.text() });
    }
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
