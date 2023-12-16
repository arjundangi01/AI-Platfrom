import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
// import checkSubscription from '@/lib/subscription';
import checkSubscription from "@/lib/subscription";
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { getPrismaInstance } from "@/prisma/prismadb";

const config = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openAI = new OpenAIApi(config);

export async function POST(req) {
  const body = await req.json();
  const { messages } = body;
  // console.log('in api', messages);

  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!config.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      console.log("free trial", freeTrial , isPro );
      return new NextResponse(
        "Free trial has expired. Please upgrade to pro.",
        { status: 403 }
      );
    }
    const response = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    // console.log(response.data.choices[0].message)
    if (!isPro) {
      await incrementApiLimit();
    }
    return NextResponse.json(response.data.choices[0].message);

    // return NextResponse.json({data:["hi"]});
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
