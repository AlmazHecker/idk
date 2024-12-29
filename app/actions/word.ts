"use server";

import { endOfDay, startOfDay } from "date-fns";
import { prisma } from "@shared/lib/prisma-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { Word } from "@prisma/client";

export const getRandomWords = async (day: Date | string, limit: number) => {
  const session = await getServerSession(authOptions);

  let randomWords: Word[];

  if (day) {
    const startOfDayDate = startOfDay(new Date(day)).toISOString();
    const endOfDayDate = endOfDay(new Date(day)).toISOString();

    randomWords = await prisma.$queryRaw`
      SELECT *
      FROM "Word"
      WHERE "userId" = ${+session?.user?.id}
        AND "createdAt" BETWEEN ${startOfDayDate}::timestamp AND ${endOfDayDate}::timestamp
      ORDER BY RANDOM()
        LIMIT ${limit};
    `;
  } else {
    randomWords = await prisma.$queryRaw`
      SELECT *
      FROM "Word"
      WHERE "userId" = ${+session?.user?.id}
      ORDER BY RANDOM()
        LIMIT ${limit};
    `;
  }

  return randomWords;
};
