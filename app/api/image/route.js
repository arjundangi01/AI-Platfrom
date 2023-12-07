
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

export async function POST(
  req
) {
  try {
    
    const body = await req.json();
    const { newMessage:prompt} = body;
      let amount = 4;
      let resolution = "512x512"
   

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    

   


    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });  
      console.log(response.data)

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
