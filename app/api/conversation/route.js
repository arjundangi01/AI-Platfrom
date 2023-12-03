import { Configuration, OpenAIApi } from 'openai';
import { NextResponse } from 'next/server';

const config = new Configuration({
  apiKey: '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',
});
const openAI = new OpenAIApi(config);

export async function POST(req) {
  const body = await req.json();
  const { messages } = body;
  console.log('in api', messages);

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

    return NextResponse.json(response.data.choices[0]);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
