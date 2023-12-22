import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";


const config = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openAI = new OpenAIApi(config);

export async function POST(req) {
  const body = await req.json();
  const { messages } = body;
  // console.log('in api', messages);

  try {
   
    if (!config.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }
    

    
    const response = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

   
    return NextResponse.json(response.data.choices[0].message);

    // return NextResponse.json({data:["hi"]});
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
