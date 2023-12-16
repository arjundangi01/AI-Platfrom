// lib/subscription.js
import { prismadb } from "@/prisma/prismadb";
import { auth } from "@clerk/nextjs";

const DAY_IN_MS = 86_400_000;


export const checkSubscription = async () => {
  const { userId } = auth();
 
  if (!userId) {
    return false;
  }

  try {
    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId: userId,
      },
      select: {
        stripeSubscriptionId: true,
        stripeCurrentPeriodEnd: true,
        stripeCustomerId: true,
        stripePriceId: true,
      },
    });

    if (!userSubscription) {
      return false;
    }

    const isValid =
      userSubscription.stripePriceId &&
      userSubscription.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS >
        Date.now();

    return !!isValid;
  } catch (error) {
    console.log(error)
  }finally {
    await prismadb.$disconnect()
  }
};

export default checkSubscription;
