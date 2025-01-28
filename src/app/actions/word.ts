"use server";

import { endOfDay, startOfDay } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { prisma } from "@shared/lib/prisma-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/auth";
import { Word } from "@prisma/client";
import { DateRange } from "react-day-picker";
import { isInvalidDate } from "@/src/shared/lib/date";

export const getRandomWords = async (
  range: DateRange | undefined,
  limit: number,
  timezone: string
) => {
  const session = await getServerSession(authOptions);

  let randomWords: Word[];

  console.log(range?.from);

  if (
    range?.from &&
    range?.to &&
    !isInvalidDate(range?.from) &&
    !isInvalidDate(range?.to)
  ) {
    // Convert dates to user's timezone and get start/end boundaries
    const zonedStartDate = toZonedTime(range.from, timezone);
    const zonedEndDate = toZonedTime(range.to, timezone);

    const startDateTime = fromZonedTime(
      startOfDay(zonedStartDate),
      timezone
    ).toISOString();
    const endDateTime = fromZonedTime(
      endOfDay(zonedEndDate),
      timezone
    ).toISOString();

    randomWords = await prisma.$queryRaw`
      SELECT *
      FROM "Word"
      WHERE "userId" = ${+session?.user?.id}
        AND "createdAt" BETWEEN ${startDateTime}::timestamp AND ${endDateTime}::timestamp
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
