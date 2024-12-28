import WordQuiz from "@/src/features/WordQuiz/ui/WordQuiz";
import React, { FC } from "react";
import { prisma } from "@shared/lib/prisma-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { Word } from "@prisma/client";
import { endOfDay, startOfDay } from "date-fns";

type PageProps = {
  searchParams: Promise<{
    "word-count": string;
    difficulty: string;
    day: string;
  }>;
};

const Page: FC<PageProps> = async ({ searchParams }) => {
  const p = await searchParams;

  const day = p?.day ? new Date(p?.day) : "";
  const wordCount = p?.["word-count"];
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
        LIMIT ${+wordCount || 10};
    `;
  } else {
    randomWords = await prisma.$queryRaw`
      SELECT *
      FROM "Word"
      WHERE "userId" = ${+session?.user?.id}
      ORDER BY RANDOM()
        LIMIT ${+wordCount || 10};
    `;
  }
  return (
    <div className="max-w-xl mx-auto grid place-items-center h-[calc(100vh-92px-6.5rem)] md:h-[calc(100vh-76px-5rem)]">
      {randomWords?.length ? (
        <WordQuiz difficulty={p.difficulty} words={randomWords || []} />
      ) : (
        <div>No words available for the quiz.</div>
      )}
    </div>
  );
};

export default Page;
