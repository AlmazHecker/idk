import WordQuiz from "@/src/features/WordQuiz/ui/WordQuiz";
import React from "react";
import { prisma } from "@shared/lib/prisma-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { Word } from "@prisma/client";

const Page = async () => {
  const session = await getServerSession(authOptions);

  const randomWords: Word[] = await prisma.$queryRaw`
  SELECT * 
  FROM "Word" 
  WHERE "userId" = ${+session?.user?.id}
  ORDER BY RANDOM() 
  LIMIT 10;
`;

  return (
    <div className="max-w-xl mx-auto grid place-items-center h-[calc(100vh-92px-6.5rem)] md:h-[calc(100vh-76px-5rem)]">
      {randomWords?.length ? (
        <WordQuiz words={randomWords || []} />
      ) : (
        <div>No words available for the quiz.</div>
      )}
    </div>
  );
};

export default Page;
