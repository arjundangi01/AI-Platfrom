
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";



const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructionMessage = {
  role: "system",
  content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
};

export async function POST(
  req
) {
  try {
    
    const body = await req.json();
    const { messages  } = body;

   

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

  

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages]
    });

  

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log('[CODE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
