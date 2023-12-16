// lib/api-limit.js
import { auth } from "@clerk/nextjs";
import { MAX_FREE_COUNTS } from "@/constant";
import { prismadb } from "@/prisma/prismadb";
import { connect } from "./connect";



export const incrementApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  try {

    await connect()

    const userApiLimit = await prismadb.userApiLimit.findUnique({
      where: { userId: userId },
    });

    if (userApiLimit) {
      await prismadb.userApiLimit.update({
        where: { userId: userId },
        data: { count: userApiLimit.count + 1 },
      });
    } else {
      await prismadb.userApiLimit.create({
        data: { userId: userId, count: 1 },
      });
    }
  } catch(error) {
     console.log(error)
  } finally {
     await prismadb.$disconnect()
   }
};

export const checkApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    
    return false;
  }
  try { 

    const userApiLimit = await prismadb.userApiLimit.findUnique({
      where: { userId: userId },
    });

    return !userApiLimit || userApiLimit?.count < MAX_FREE_COUNTS;
  } catch (error) {
    console.log(error)
  }finally {
    await prismadb.$disconnect()
  }
};

export const getApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  try {

    const userApiLimit = await prismadb.userApiLimit.findUnique({
      where: {
        userId,
      },
    });

    return userApiLimit ? userApiLimit.count : 0;
  } catch (error) {
    console.log(error)
  }finally {
    await prismadb.$disconnect()
  }
};
